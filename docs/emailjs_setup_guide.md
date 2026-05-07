
# EmailJS Integration Setup Guide

## Overview
This guide walks through setting up EmailJS for the contact form in the Mohamed Ashraf Personal Portfolio.

## Prerequisites
- EmailJS account (free tier available at https://www.emailjs.com)
- Next.js development environment

## Step 1: Create EmailJS Account

1. Visit https://www.emailjs.com
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. Go to the Email Services section
2. Add a new email service (e.g., Gmail, Outlook, or custom SMTP)
3. Follow the authentication process for your chosen service
4. Copy the **Service ID** - you'll need this later

## Step 3: Create Email Template

1. Go to the Email Templates section
2. Create a new template
3. Use the following template structure:

```
Subject: New Project Inquiry from {{name}}

Name: {{name}}
Email: {{email}}
Project Type: {{projectType}}
Budget: {{budget}}
Timeline: {{timeline}}
Details: {{details}}
```

4. Save the template
5. Copy the **Template ID** - you'll need this later

## Step 4: Get Public Key

1. Go to Account > General
2. Copy the **Public Key** - you'll need this later

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with the IDs and key you copied from EmailJS.

## Step 6: Test the Integration

### Development Testing

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the contact page: http://localhost:3000/en/contact

3. Fill out the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Project Type: Select any option
   - Budget: Select any option
   - Timeline: Select any option
   - Details: This is a test message

4. Submit the form

5. Check for:
   - Success message appears
   - Email is received in your inbox
   - Email contains all form data correctly

### Testing Edge Cases

1. **Invalid Email**: Submit with an invalid email format
   - Expected: Validation error message appears

2. **Empty Fields**: Submit with required fields empty
   - Expected: Validation error messages appear

3. **Spam Protection**: Fill in the hidden "bot-field" (using browser dev tools)
   - Expected: Form submission fails or email is not sent

4. **Network Error**: Disconnect internet and submit form
   - Expected: Error message appears with proper error handling

## Troubleshooting

### Form submits but no email received
- Check EmailJS dashboard for submission logs
- Verify email service is properly connected
- Check spam folder in your email
- Ensure template variables match form field names

### Environment variables not working
- Restart development server after adding `.env.local`
- Verify variable names match exactly (case-sensitive)
- Check that variables start with `NEXT_PUBLIC_`

### CORS errors
- Verify EmailJS service is properly configured
- Check that you're using the correct public key

### Form validation not working
- Ensure all form fields have `name` attributes
- Check that required fields are properly marked
- Verify validation logic in ContactSection.tsx

## Security Considerations

1. **Honeypot Field**: The hidden "bot-field" helps prevent spam submissions
   - Bots often fill all fields, including hidden ones
   - Legitimate users won't see or interact with this field

2. **Rate Limiting**: Consider implementing rate limiting on the server side
   - EmailJS has built-in rate limiting on free tier
   - Monitor for abuse in EmailJS dashboard

3. **Input Validation**: Client-side validation is implemented
   - Email format validation
   - Required field checking
   - Server-side validation should be added if implementing custom backend

## Analytics Integration

The contact form now tracks the following events:
- `contact_form_started`: When user begins filling the form
- `contact_form_validation_failed`: When validation fails
- `contact_form_submitted`: When form is successfully submitted
- `contact_form_submit_failed`: When submission encounters an error

These events are automatically sent to your configured analytics (Google Analytics or Plausible).

## Next Steps

After successful EmailJS integration:
1. Test thoroughly with various scenarios
2. Monitor email delivery in EmailJS dashboard
3. Set up email notifications for new submissions
4. Consider implementing additional features:
   - File upload for project briefs
   - Multi-step form for complex inquiries
   - Auto-reply email to sender

## Support

For issues with EmailJS specifically:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

For issues with the portfolio implementation:
- Check the ContactSection.tsx component
- Review the emailjs.ts utility file
- Verify environment variables are correctly set
