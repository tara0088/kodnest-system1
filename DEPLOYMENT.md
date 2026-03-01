# Deployment & Production Guide

## Production Build

### Build for Production

```bash
npm run build
```

This command:
- Compiles all TypeScript code
- Optimizes React components
- Generates static files
- Creates `.next` directory

### Start Production Server

```bash
npm start
```

Runs the production-optimized server on `http://localhost:3000`

## Environment Configuration

### Development
- Port: 3001 (auto-assigned if 3000 in use)
- Mode: Fast refresh enabled
- Console: Verbose logging

### Production
- Port: 3000 (configurable)
- Mode: Optimized
- Console: Minimal logging

### Environment Variables

Create `.env.local` file in project root:

```
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_APP_NAME=AI Resume Builder
```

## Deployment Platforms

### Vercel (Recommended for Next.js)

1. Connect GitHub repository
2. Vercel auto-detects Next.js
3. Deploy with one click
4. Auto-builds on push

```bash
npm install -g vercel
vercel
```

### Other Platforms

#### Netlify
- Not recommended (limited Node.js support)
- Use Static Export if needed

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Traditional Hosting
1. Run `npm run build`
2. Upload `.next` directory
3. Set Node.js runtime
4. Configure start command: `npm start`

## Database & Backend

For production data storage:

### Option 1: Supabase (PostgreSQL)
- Free tier available
- Real-time features
- Built-in auth

### Option 2: Firebase
- NoSQL real-time database
- Cloud functions
- Authentication ready

### Option 3: Traditional SQL Database
- PostgreSQL
- MySQL
- Run your own backend API

## Security Checklist

- [ ] Remove console.log statements
- [ ] Enable HTTPS
- [ ] Set secure headers
- [ ] Implement CORS properly
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up error monitoring
- [ ] Enable security headers (helmet.js)
- [ ] Implement CSRF protection

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  width={800}
  height={600}
  priority={false}
/>
```

### Code Splitting
Next.js automatically code-splits at page level.

### Compression
Enable gzip compression in next.config.js:

```javascript
module.exports = {
  compress: true,
}
```

## Monitoring & Analytics

### Error Tracking
- Sentry.io (free tier)
- Rollbar
- LogRocket

### Performance Monitoring
- Google Analytics
- Vercel Analytics
- New Relic
- Datadog

### Example: Sentry Setup
```bash
npm install @sentry/nextjs
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'

      - run: npm install
      - run: npm run lint
      - run: npm run build
      - run: npm start
```

## Database Migration (When Needed)

### Add to Backend

1. Create API routes in `app/api/`
2. Configure database connection
3. Run migrations
4. Update environment variables

Example API route:

```typescript
// app/api/artifacts/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  // Save to database
  return Response.json({ success: true })
}
```

## Scaling Strategy

### Phase 1: Single Server (Current)
- Dev server running locally
- localStorage for data

### Phase 2: Production Server
- Deploy to Vercel or similar
- Add backend API

### Phase 3: Database & Auth
- Add user authentication
- Implement database
- Enable multi-user support

### Phase 4: Advanced Features
- Real-time collaboration
- Advanced analytics
- Machine learning features

## Maintenance

### Regular Tasks
- Update npm packages: `npm update`
- Security audits: `npm audit fix`
- Monitor analytics
- Check error logs
- Backup database

### Version Control
- Keep main branch production-ready
- Use develop branch for features
- Create feature branches
- Code review before merge

## Backup & Disaster Recovery

### File Backups
- Use git for code backup
- GitHub/GitLab as remote
- Daily backups of database

### Database Recovery
- Enable automated backups
- Test recovery procedures
- Document recovery steps

## Post-Launch

### First Week Monitoring
- Watch error logs closely
- Monitor server performance
- Collect user feedback
- Fix critical issues immediately

### Ongoing Support
- Schedule regular updates
- Monitor user feedback
- Plan feature releases
- Track analytics metrics

## Rollback Plan

If issues occur in production:

```bash
# View deployment history
git log --oneline

# Rollback to previous version
git revert <commit-hash>
npm run build
npm start
```

## Troubleshooting Production

### High CPU Usage
- Check for infinite loops
- Profile with DevTools
- Optimize database queries

### Memory Leaks
- Monitor process memory
- Check for event listener cleanup
- Use memory profiler

### Slow Page Loads
- Enable caching
- Optimize images
- Reduce bundle size
- Use CDN for static files

## Support & Documentation

### For Lovable Integration
- Lovable Dashboard: https://lovable.dev
- Export components from Lovable
- Integrate into Next.js

### For Deployment
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

---

**Status**: Ready for Production Deployment  
**Last Updated**: March 1, 2026
