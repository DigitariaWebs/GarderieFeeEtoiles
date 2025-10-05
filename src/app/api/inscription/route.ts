import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  sanitizeInput,
  validateEmail,
  auditLogger,
  checkRateLimit,
} from "@/lib/security";

export const runtime = "nodejs";

interface InscriptionFormData {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childBirthDate: string;
  startDate: string;
  serviceType: string;
  additionalInfo?: string;
}

/** Basic HTML escape */
function escapeHTML(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Convert newlines to <br> for readable blocks */
function nl2br(s: string) {
  return s.replace(/\r\n|\r|\n/g, "<br>");
}

function buildEmailHTML(params: {
  subject: string;
  brand: string;
  cta: string;
  muted: string;
  company: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childBirthDate: string;
  startDate: string;
  serviceType: string;
  additionalInfoHTML?: string;
}) {
  const {
    subject,
    brand,
    cta,
    muted,
    company,
    parentName,
    parentEmail,
    parentPhone,
    childName,
    childBirthDate,
    startDate,
    serviceType,
    additionalInfoHTML,
  } = params;

  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="format-detection" content="telephone=no" />
    <title>${escapeHTML(subject)}</title>
    <style>
      /* Client-specific Styles */
      body { margin:0 !important; padding:0 !important; width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
      table { border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; }
      img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
      a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }

      /* Reset styles */
      .ExternalClass { width:100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height:100%; }

      /* iOS Blue Links */
      a[href^="tel"], a[href^="sms"] { text-decoration:none; color:${brand}; pointer-events:none; cursor:default; }

      /* Mobile Styles */
      @media only screen and (max-width: 600px) {
        .email-container { width:100% !important; max-width:100% !important; }
        .stack-column { display:block !important; width:100% !important; max-width:100% !important; direction:ltr !important; }
        .stack-column-center { display:block !important; width:100% !important; max-width:100% !important; text-align:center !important; }

        /* Padding */
        .mobile-padding { padding:12px !important; }
        .mobile-padding-lr { padding-left:12px !important; padding-right:12px !important; }
        .mobile-padding-tb { padding-top:12px !important; padding-bottom:12px !important; }

        /* Text sizes */
        .h1 { font-size:20px !important; line-height:26px !important; }
        .h2 { font-size:16px !important; line-height:22px !important; }
        .p { font-size:14px !important; line-height:20px !important; }
        .small { font-size:12px !important; line-height:18px !important; }

        /* Buttons */
        .btn-primary { display:block !important; width:100% !important; margin:8px 0 !important; padding:14px 20px !important; }
        .btn-container { padding:0 !important; }

        /* Hide elements */
        .hide-mobile { display:none !important; max-height:0 !important; overflow:hidden !important; }

        /* Stack spacing */
        .stack-spacing { padding:0 0 8px 0 !important; }

        /* Force full width for contact cards */
        .stack-spacing table { width:100% !important; }
        .stack-spacing td { width:100% !important; display:block !important; }
      }

      /* Gmail App fix */
      u + .body .gmail-blend-screen { background:#000; mix-blend-mode:screen; }
      u + .body .gmail-blend-difference { background:#000; mix-blend-mode:difference; }
    </style>
  </head>
  <body class="body" style="margin:0; padding:0; width:100%; background-color:#f6f7f9; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">

    <!-- Preheader text -->
    <div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#f6f7f9;">
      Nouvelle demande d'inscription — ${escapeHTML(childName)} — ${escapeHTML(company)}
    </div>

    <!-- 100% background wrapper -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f6f7f9;">
      <tr>
        <td align="center" style="padding:16px;">

          <!-- Email Container -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container" style="margin:0 auto; max-width:600px; width:100%;">

            <!-- Header -->
            <tr>
              <td style="background:${brand}; padding:24px 20px; text-align:center; border-radius:12px 12px 0 0;" class="mobile-padding">
                <h1 class="h1" style="margin:0 0 8px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:22px; line-height:28px; color:#ffffff; font-weight:700;">
                  ${escapeHTML(subject)}
                </h1>
                <p style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:20px; color:rgba(255,255,255,0.95);">
                  ${escapeHTML(company)}
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background:#ffffff; padding:20px; border-radius:0 0 12px 12px; box-shadow:0 2px 8px rgba(0,0,0,0.08);" class="mobile-padding">

                <!-- Contact Info Cards -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">

                  <!-- Parent Name -->
                  <tr>
                    <td class="stack-spacing" style="padding-bottom:12px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                        <tr>
                          <td style="padding:14px;">
                            <p style="margin:0 0 4px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:16px; color:${muted}; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">
                              Parent/Tuteur
                            </p>
                            <p class="p" style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:22px; color:#111827; font-weight:600;">
                              ${escapeHTML(parentName)}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Parent Email -->
                  <tr>
                    <td class="stack-spacing" style="padding-bottom:12px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                        <tr>
                          <td style="padding:14px;">
                            <p style="margin:0 0 4px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:16px; color:${muted}; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">
                              Email Parent
                            </p>
                            <p class="p" style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:22px; font-weight:600; word-break:break-all;">
                              <a href="mailto:${escapeHTML(parentEmail)}" style="color:${brand}; text-decoration:none;">${escapeHTML(parentEmail)}</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Parent Phone -->
                  <tr>
                    <td class="stack-spacing" style="padding-bottom:12px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                        <tr>
                          <td style="padding:14px;">
                            <p style="margin:0 0 4px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:16px; color:${muted}; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">
                              Téléphone Parent
                            </p>
                            <p class="p" style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:22px; font-weight:600;">
                              <a href="tel:${escapeHTML(parentPhone)}" style="color:${brand}; text-decoration:none;">${escapeHTML(parentPhone)}</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Child Name -->
                  <tr>
                    <td class="stack-spacing" style="padding-bottom:12px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                        <tr>
                          <td style="padding:14px;">
                            <p style="margin:0 0 4px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:16px; color:${muted}; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">
                              Nom de l'Enfant
                            </p>
                            <p class="p" style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:22px; color:#111827; font-weight:600;">
                              ${escapeHTML(childName)}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Child Birth Date -->
                  <tr>
                    <td class="stack-spacing" style="padding-bottom:12px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                        <tr>
                          <td style="padding:14px;">
                            <p style="margin:0 0 4px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:16px; color:${muted}; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">
                              Date de Naissance
                            </p>
                            <p class="p" style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:22px; color:#111827; font-weight:600;">
                              ${escapeHTML(childBirthDate)}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Start Date -->
                  <tr>
                    <td class="stack-spacing" style="padding-bottom:12px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                        <tr>
                          <td style="padding:14px;">
                            <p style="margin:0 0 4px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:16px; color:${muted}; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">
                              Date de Début Souhaitée
                            </p>
                            <p class="p" style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:22px; color:#111827; font-weight:600;">
                              ${escapeHTML(startDate)}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Service Type -->
                  <tr>
                    <td class="stack-spacing" style="padding-bottom:12px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                        <tr>
                          <td style="padding:14px;">
                            <p style="margin:0 0 4px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:16px; color:${muted}; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">
                              Type de Service
                            </p>
                            <p class="p" style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:22px; color:#111827; font-weight:600;">
                              ${escapeHTML(serviceType)}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  ${additionalInfoHTML ? `
                  <!-- Additional Info -->
                  <tr>
                    <td style="padding-bottom:12px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px;">
                        <tr>
                          <td style="padding:16px;">
                            <p class="h2" style="margin:0 0 8px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:20px; color:#111827; font-weight:700;">
                              Informations Supplémentaires
                            </p>
                            <div class="p" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:22px; color:#374151; word-break:break-word;">
                              ${additionalInfoHTML}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  ` : ''}

                  <!-- Action Buttons -->
                  <tr>
                    <td class="btn-container" style="padding:12px 0 0 0;">
                      <!-- Email Button -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="padding-bottom:12px;">
                            <a href="mailto:${escapeHTML(parentEmail)}" class="btn-primary" style="display:block; background:${cta}; color:#ffffff; text-align:center; padding:14px 24px; border-radius:8px; text-decoration:none; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; font-weight:700; line-height:20px;">
                              Répondre par email
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="tel:${escapeHTML(parentPhone)}" class="btn-primary" style="display:block; background:${brand}; color:#ffffff; text-align:center; padding:14px 24px; border-radius:8px; text-decoration:none; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; font-weight:700; line-height:20px;">
                              Appeler maintenant
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#1f2937; padding:20px; text-align:center; border-radius:0 0 12px 12px;" class="mobile-padding">
                <p class="small" style="margin:0 0 6px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:13px; line-height:18px; color:#ffffff; font-weight:600;">
                  ${escapeHTML(company)}
                </p>
                <p class="small" style="margin:0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:12px; line-height:18px; color:#9ca3af;">
                  Email généré automatiquement
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit by IP (3 requests per hour)
    if (!checkRateLimit(`inscription_ip_${clientIP}`, 3, 60 * 60 * 1000)) {
      auditLogger.log({
        action: "RATE_LIMIT_EXCEEDED",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { endpoint: "inscription", scope: "ip" },
      });
      return NextResponse.json(
        { error: "Trop de soumissions, veuillez réessayer plus tard." },
        { status: 429 }
      );
    }

    let body: InscriptionFormData;
    try {
      body = (await request.json()) as InscriptionFormData;
    } catch {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    const {
      parentName,
      parentEmail,
      parentPhone,
      childName,
      childBirthDate,
      startDate,
      serviceType,
      additionalInfo,
    } = body || ({} as InscriptionFormData);

    if (!parentName || !parentEmail || !parentPhone || !childName || !childBirthDate || !startDate || !serviceType) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être remplis" },
        { status: 400 }
      );
    }

    const sanitizedParentName = sanitizeInput(parentName);
    const sanitizedParentEmail = sanitizeInput(parentEmail).toLowerCase();
    const sanitizedParentPhone = sanitizeInput(parentPhone);
    const sanitizedChildName = sanitizeInput(childName);
    const sanitizedChildBirthDate = sanitizeInput(childBirthDate);
    const sanitizedStartDate = sanitizeInput(startDate);
    const sanitizedServiceType = sanitizeInput(serviceType);
    const sanitizedAdditionalInfo = additionalInfo ? sanitizeInput(additionalInfo) : undefined;

    if (!validateEmail(sanitizedParentEmail)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }
    if (sanitizedParentPhone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { error: "Le numéro de téléphone doit contenir au moins 10 chiffres" },
        { status: 400 }
      );
    }

    // Validate dates
    const birthDate = new Date(sanitizedChildBirthDate);
    const startDateObj = new Date(sanitizedStartDate);
    const today = new Date();

    if (birthDate >= today) {
      return NextResponse.json(
        { error: "La date de naissance doit être dans le passé" },
        { status: 400 }
      );
    }

    if (startDateObj <= today) {
      return NextResponse.json(
        { error: "La date de début doit être dans le futur" },
        { status: 400 }
      );
    }

    // Email-scoped rate limit
    if (!checkRateLimit(`inscription_email_${sanitizedParentEmail}`, 3, 60 * 60 * 1000)) {
      auditLogger.log({
        action: "RATE_LIMIT_EXCEEDED",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { endpoint: "inscription", scope: "email", email: sanitizedParentEmail },
      });
      return NextResponse.json(
        { error: "Trop de soumissions, veuillez réessayer plus tard." },
        { status: 429 }
      );
    }

    auditLogger.log({
      action: "INSCRIPTION_FORM_SUBMITTED",
      ip: clientIP,
      userAgent: request.headers.get("user-agent") || "",
      details: {
        parentEmail: sanitizedParentEmail,
        parentName: sanitizedParentName,
        childName: sanitizedChildName,
        serviceType: sanitizedServiceType,
      },
    });

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user || "no-reply@example.com";
    const to = process.env.CONTACT_EMAIL || user || "";

    if (!user || !pass || !to) {
      console.error("Email configuration missing");
      return NextResponse.json(
        { error: "Configuration email non disponible sur le serveur" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      pool: true,
      maxConnections: 3,
      maxMessages: 50,
    });

    const subject = `Nouvelle demande d'inscription — ${sanitizedChildName}`;
    const brand = "#8B4789"; // Purple color for Garderie la fée des étoiles
    const cta = "#E91E63"; // Pink accent
    const muted = "#6b7280";
    const company = "Garderie la fée des étoiles";

    const additionalInfoHTML =
      sanitizedAdditionalInfo && sanitizedAdditionalInfo.trim().length
        ? nl2br(escapeHTML(sanitizedAdditionalInfo))
        : undefined;

    const html = buildEmailHTML({
      subject,
      brand,
      cta,
      muted,
      company,
      parentName: sanitizedParentName,
      parentEmail: sanitizedParentEmail,
      parentPhone: sanitizedParentPhone,
      childName: sanitizedChildName,
      childBirthDate: sanitizedChildBirthDate,
      startDate: sanitizedStartDate,
      serviceType: sanitizedServiceType,
      additionalInfoHTML,
    });

    const text = `${subject}
================================

INFORMATIONS PARENT/TUTEUR
• Nom : ${sanitizedParentName}
• Email : ${sanitizedParentEmail}
• Téléphone : ${sanitizedParentPhone}

INFORMATIONS ENFANT
• Nom : ${sanitizedChildName}
• Date de naissance : ${sanitizedChildBirthDate}

DEMANDE D'INSCRIPTION
• Date de début souhaitée : ${sanitizedStartDate}
• Type de service : ${sanitizedServiceType}
${sanitizedAdditionalInfo ? `\nINFORMATIONS SUPPLÉMENTAIRES\n${sanitizedAdditionalInfo}\n` : ""}

PROCHAINES ÉTAPES
• Contacter la famille dans les 24 heures
• Email : ${sanitizedParentEmail}
• Téléphone : ${sanitizedParentPhone}
`;

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
      replyTo: sanitizedParentEmail,
      headers: {
        "X-Entity-Ref-ID": `inscription-${Date.now()}`,
      },
    });

    return NextResponse.json(
      { message: "Demande d'inscription envoyée avec succès !" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending inscription email:", error);
    return NextResponse.json(
      { error: "Échec de l'envoi de la demande d'inscription. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}