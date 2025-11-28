# ZYGOTE SERIES - Global QA Checklist

## 1. Backend & Database
- [ ] **Migrations:** Run \`npx prisma migrate deploy\` on production DB.
- [ ] **Seeding:** Verify Admin user (`DR.zygot_72`) exists in DB.
- [ ] **Auth:** Test Login returns JWT Access + Refresh tokens.
- [ ] **RBAC:** Verify `Student` role cannot access `/api/admin/*` endpoints.
- [ ] **S3:** Verify `/api/admin/upload-url` returns a valid signed URL.
- [ ] **Stripe:** Verify Webhook endpoint receives events (use Stripe CLI to test).

## 2. Admin CMS
- [ ] **Login:** Admin can log in and is redirected to Dashboard.
- [ ] **Import:** Upload `sample_data/mcqs_import_sample.csv`. Verify 4 MCQs are added to DB.
- [ ] **Content:** Create a Subject -> Chapter -> Subtopic manually.
- [ ] **Preview:** Verify "Draft" content is visible in Admin but locked in Mobile App (if implemented).

## 3. Mobile App (Student)
- [ ] **Onboarding:** Slides show only on first launch (check AsyncStorage).
- [ ] **Auth:** Login with a test student account.
- [ ] **Navigation:** Tab bar navigation works (Home, Search, Bookmarks).
- [ ] **Reader:**
    - [ ] Notes tab renders text.
    - [ ] MCQs tab shows options.
    - [ ] Selecting correct answer shows Green; wrong shows Red.
- [ ] **Offline:** Turn off WiFi. Verify previously visited chapters load from cache.
- [ ] **Paywall:** Try to access a "Locked" chapter. Verify Paywall screen appears.

## 4. Deployment & Security
- [ ] **SSL:** HTTPS enabled on all domains (api.zygote.com, admin.zygote.com).
- [ ] **Env Vars:** No secrets committed to Git. `.env` file present on server.
- [ ] **Cors:** Backend only accepts requests from Admin and Mobile App domains.
- [ ] **Logs:** PM2 logs show no recurring errors (`pm2 logs`).
