"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const node_fetch_1 = __importDefault(require("node-fetch"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Validation schemas
const leadSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    company: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    eventDate: zod_1.z.string().optional().transform(val => val ? new Date(val) : undefined),
    attendees: zod_1.z.number().optional(),
    interest: zod_1.z.array(zod_1.z.string()).optional().default([]),
    notes: zod_1.z.string().optional(),
});
const ticketSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    subject: zod_1.z.string().min(1),
    message: zod_1.z.string().min(1),
    priority: zod_1.z.enum(['low', 'normal', 'high']).optional().default('normal'),
});
// Webhook helper
async function sendWebhook(url, data) {
    if (!url)
        return;
    try {
        const response = await (0, node_fetch_1.default)(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        console.log('Webhook sent:', response.status);
    }
    catch (error) {
        console.error('Webhook error:', error);
    }
}
// API Routes
// Lead capture (demo requests)
app.post('/api/lead', async (req, res) => {
    try {
        const validatedData = leadSchema.parse(req.body);
        const lead = await prisma.lead.create({
            data: {
                ...validatedData,
                interest: JSON.stringify(validatedData.interest || []),
            },
        });
        // Send to n8n webhook
        await sendWebhook(process.env.N8N_WEBHOOK_URL_DEMO, {
            type: 'demo_request',
            lead,
        });
        res.status(201).json({ success: true, id: lead.id });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Lead creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Support ticket creation
app.post('/api/support/ticket', async (req, res) => {
    try {
        const validatedData = ticketSchema.parse(req.body);
        const ticket = await prisma.ticket.create({
            data: validatedData,
        });
        // Send to n8n webhook
        await sendWebhook(process.env.N8N_WEBHOOK_URL_SUPPORT, {
            type: 'support_ticket',
            ticket,
        });
        res.status(201).json({ success: true, id: ticket.id });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        console.error('Ticket creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get pricing data
app.get('/api/pricing', async (req, res) => {
    try {
        const [items, modules, packages] = await Promise.all([
            prisma.item.findMany({ orderBy: { name: 'asc' } }),
            prisma.module.findMany({ orderBy: { name: 'asc' } }),
            prisma.package.findMany({ orderBy: { name: 'asc' } }),
        ]);
        res.json({
            items,
            modules,
            packages,
        });
    }
    catch (error) {
        console.error('Pricing fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get module details
app.get('/api/modules/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const module = await prisma.module.findUnique({
            where: { slug },
        });
        if (!module) {
            return res.status(404).json({ error: 'Module not found' });
        }
        res.json(module);
    }
    catch (error) {
        console.error('Module fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get all modules
app.get('/api/modules', async (req, res) => {
    try {
        const modules = await prisma.module.findMany({
            orderBy: { name: 'asc' },
        });
        res.json(modules);
    }
    catch (error) {
        console.error('Modules fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get FAQ
app.get('/api/faq', async (req, res) => {
    try {
        const faqs = await prisma.fAQ.findMany({
            orderBy: { order: 'asc' },
        });
        res.json(faqs);
    }
    catch (error) {
        console.error('FAQ fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get packages
app.get('/api/packages', async (req, res) => {
    try {
        const packages = await prisma.package.findMany({
            orderBy: { name: 'asc' },
        });
        res.json(packages);
    }
    catch (error) {
        console.error('Packages fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 API server running on port ${PORT}`);
});
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=index.js.map