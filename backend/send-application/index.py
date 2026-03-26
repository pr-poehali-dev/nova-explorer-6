import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки от кандидата на почту кафе «Набережная добра»"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    position = body.get("position", "").strip()
    category = body.get("category", "").strip()
    comment = body.get("comment", "").strip()

    if not name or not phone or not position:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Заполните обязательные поля"}),
        }

    smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ["SMTP_USER"]
    smtp_pass = os.environ["SMTP_PASS"]
    to_email = os.environ["TO_EMAIL"]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка: {position} — {name}"
    msg["From"] = smtp_user
    msg["To"] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a1a1a; padding: 24px;">
        <h1 style="color: white; margin: 0; font-size: 20px;">НАБЕРЕЖНАЯ ДОБРА</h1>
        <p style="color: #aaa; margin: 4px 0 0;">Новая заявка на вакансию</p>
      </div>
      <div style="border: 2px solid #1a1a1a; padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666; font-size: 13px; width: 160px;">ИМЯ</td>
            <td style="padding: 12px 0; font-weight: 700;">{name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666; font-size: 13px;">ТЕЛЕФОН</td>
            <td style="padding: 12px 0; font-weight: 700;">{phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; color: #666; font-size: 13px;">ВАКАНСИЯ</td>
            <td style="padding: 12px 0; font-weight: 700; color: #b83232;">{position}</td>
          </tr>
          {"" if not category else f'<tr style="border-bottom: 1px solid #eee;"><td style="padding: 12px 0; color: #666; font-size: 13px;">КАТЕГОРИЯ</td><td style="padding: 12px 0;">{category}</td></tr>'}
          {"" if not comment else f'<tr><td style="padding: 12px 0; color: #666; font-size: 13px; vertical-align: top;">КОММЕНТАРИЙ</td><td style="padding: 12px 0;">{comment}</td></tr>'}
        </table>
      </div>
      <div style="padding: 16px; background: #f5f0e8; font-size: 12px; color: #999;">
        Заявка отправлена с сайта набережнаядобра.рф
      </div>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"success": True, "message": "Заявка отправлена!"}),
    }
