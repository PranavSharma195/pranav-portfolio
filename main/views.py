import logging

from django.conf import settings
from django.core.mail import EmailMessage
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST

from . import data
from .forms import ContactForm

logger = logging.getLogger(__name__)


def index(request):
    context = {
        "profile": data.PROFILE,
        "experience": data.EXPERIENCE,
        "education": data.EDUCATION,
        "skills": data.SKILLS,
        "soft_skills": data.SOFT_SKILLS,
        "projects": data.PROJECTS,
        "certifications": data.CERTIFICATIONS,
        "achievements": data.ACHIEVEMENTS,
        "references": data.REFERENCES,
        "contact_form": ContactForm(),
    }
    return render(request, "main/index.html", context)


@require_POST
def contact_submit(request):
    """
    Handles the contact form via AJAX (fetch). Sends the message straight to
    CONTACT_RECEIVER_EMAIL using Django's email backend and returns JSON so
    the front end can show an inline success/error state without a page
    reload.
    """
    form = ContactForm(request.POST)

    if not form.is_valid():
        return JsonResponse({"ok": False, "errors": form.errors}, status=400)

    name = form.cleaned_data["name"]
    email = form.cleaned_data["email"]
    subject = form.cleaned_data.get("subject") or f"New portfolio message from {name}"
    message = form.cleaned_data["message"]

    body = (
        f"You've received a new message from your portfolio site.\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{message}\n"
    )

    try:
        email_message = EmailMessage(
            subject=f"[Portfolio] {subject}",
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL or settings.EMAIL_HOST_USER,
            to=[settings.CONTACT_RECEIVER_EMAIL],
            # Lets you hit "reply" in your inbox and reply straight to the sender.
            headers={"Reply-To": email} if email else None,
        )
        email_message.send(fail_silently=False)
    except Exception:
        logger.exception("Failed to send contact form email")
        return JsonResponse(
            {
                "ok": False,
                "errors": {"__all__": ["Something went wrong sending your message. Please try emailing directly."]},
            },
            status=500,
        )

    return JsonResponse({"ok": True, "message": "Thanks! Your message has been sent — I'll get back to you soon."})
