# SmartVisitor Deployment Guide

## Quick Deploy Checklist

### 1. Database Setup (Railway PostgreSQL)

1. Create new PostgreSQL service on Railway
2. Note the connection string
3. Run migrations:
```bash
DATABASE_URL="your-railway-postgres-url" pnpm prisma migrate deploy
DATABASE_URL="your-railway-postgres-url" pnpm prisma db seed
```

### 2. Backend API (Railway)

1. Create new service from GitHub repo
2. Set root directory to `apps/api`
3. Environment variables:
```
DATABASE_URL=your-railway-postgres-url
N8N_WEBHOOK_URL_SUPPORT=https://your-n8n.com/webhook/support
N8N_WEBHOOK_URL_DEMO=https://your-n8n.com/webhook/demo
ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=3001
```

4. Deploy command: `pnpm install && pnpm build && pnpm start`

### 3. Frontend (Vercel)

1. Import GitHub repo to Vercel
2. Set root directory to `apps/web`
3. Environment variables:
```
NEXT_PUBLIC_API_BASE=https://your-api.railway.app
NEXT_PUBLIC_SUPPORT_BRAND=SmartVisitor
```

4. Deploy automatically

### 4. n8n Webhooks Setup

Create two workflows in n8n:

#### Support Webhook (`/webhook/support`)
```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "support",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Email Support Team",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "to": "support@smartvisitor.nl",
        "subject": "New Support Ticket: {{$json.ticket.subject}}",
        "text": "From: {{$json.ticket.email}}\nPriority: {{$json.ticket.priority}}\n\n{{$json.ticket.message}}"
      }
    }
  ]
}
```

#### Demo Webhook (`/webhook/demo`)
```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "demo",
        "httpMethod": "POST"
      }
    },
    {
      "name": "Email Sales Team",
      "type": "n8n-nodes-base.emailSend",
      "parameters": {
        "to": "sales@smartvisitor.nl",
        "subject": "New Demo Request: {{$json.lead.company}}",
        "text": "Name: {{$json.lead.name}}\nEmail: {{$json.lead.email}}\nCompany: {{$json.lead.company}}\nEvent Date: {{$json.lead.eventDate}}\nAttendees: {{$json.lead.attendees}}\nInterest: {{$json.lead.interest}}\n\nNotes:\n{{$json.lead.notes}}"
      }
    },
    {
      "name": "Add to CRM",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://your-crm.com/api/leads",
        "method": "POST",
        "body": "{{$json.lead}}"
      }
    }
  ]
}
```

## Environment Variables Reference

### Frontend (`apps/web`)
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE` | Backend API URL | `https://api.railway.app` |
| `NEXT_PUBLIC_SUPPORT_BRAND` | Brand name | `SmartVisitor` |

### Backend (`apps/api`)
| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:port/db` |
| `N8N_WEBHOOK_URL_SUPPORT` | Support webhook | `https://n8n.com/webhook/support` |
| `N8N_WEBHOOK_URL_DEMO` | Demo webhook | `https://n8n.com/webhook/demo` |
| `ALLOWED_ORIGINS` | CORS origins | `https://smartvisitor.vercel.app` |
| `PORT` | Server port | `3001` |

## Post-Deployment Verification

### 1. Health Checks
- [ ] Frontend loads: `https://your-site.vercel.app`
- [ ] API health: `https://your-api.railway.app/health`
- [ ] Database connection works

### 2. Functionality Tests
- [ ] Homepage loads with data
- [ ] Demo form submits successfully
- [ ] Support form creates tickets
- [ ] Pricing page shows all data
- [ ] Module pages load correctly

### 3. SEO & Performance
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Meta tags present
- [ ] Core Web Vitals > 90

### 4. Webhooks
- [ ] Demo submissions trigger n8n
- [ ] Support tickets trigger n8n
- [ ] Email notifications work
- [ ] CRM integration works

## Monitoring & Maintenance

### Logs
- **Vercel**: Check function logs in dashboard
- **Railway**: Check service logs in dashboard
- **n8n**: Check workflow execution logs

### Database Maintenance
```bash
# Backup database
pg_dump $DATABASE_URL > backup.sql

# Monitor database size
SELECT pg_size_pretty(pg_database_size('smartvisitor'));

# Clean old tickets/leads (optional)
DELETE FROM tickets WHERE created_at < NOW() - INTERVAL '6 months';
```

### Performance Monitoring
- Use Vercel Analytics for frontend metrics
- Monitor Railway metrics for API performance
- Set up alerts for downtime

## Troubleshooting

### Common Issues

**Frontend not loading data:**
- Check `NEXT_PUBLIC_API_BASE` environment variable
- Verify API is accessible from frontend
- Check CORS settings in API

**API errors:**
- Check database connection
- Verify all environment variables
- Check Railway logs for errors

**Webhooks not working:**
- Verify n8n webhook URLs
- Check n8n workflow is active
- Test webhooks manually

**Database issues:**
- Check connection string format
- Verify database exists and is accessible
- Run migrations if needed

### Support Contacts
- **Technical Issues**: tech@smartvisitor.nl
- **Deployment Help**: devops@smartvisitor.nl
- **General Support**: support@smartvisitor.nl
