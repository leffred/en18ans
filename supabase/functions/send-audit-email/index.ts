import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  // Check CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    // payload structure from Supabase Database Webhook (INSERT)
    // payload.record is the newly inserted row
    const record = payload.record || payload

    if (!record || !record.email) {
      throw new Error('No email found in record')
    }

    const email = record.email
    const neighborhood = record.neighborhood || 'votre quartier'
    const kpi_beton = record.kpi_beton !== null ? record.kpi_beton : '37'
    const kpi_debt = record.kpi_debt ? (record.kpi_debt / 1000000).toFixed(1) + ' M€' : '98,4 M€'
    const kpi_density = record.kpi_density !== null ? record.kpi_density : '18 000'
    const kpi_saturation = record.kpi_saturation !== null ? record.kpi_saturation : '100'

    // HTML Email Template
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #059669; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">L'Audit de ${neighborhood}</h1>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="font-size: 16px;">Bonjour,</p>
          <p style="font-size: 16px;">Vous avez demandé à recevoir le bilan chiffré concernant la qualité de vie dans votre quartier. Voici les 4 chiffres clés que la municipalité actuelle a générés :</p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #e11d48; margin-bottom: 15px;">
            <p style="margin: 0; font-weight: bold; color: #9f1239;">Bétonnisation de votre quartier :</p>
            <p style="font-size: 22px; font-weight: 900; margin: 5px 0 0 0; color: #e11d48;">${kpi_beton}% de surface bâtie</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #e11d48; margin-bottom: 15px;">
            <p style="margin: 0; font-weight: bold; color: #9f1239;">Densité de population :</p>
            <p style="font-size: 22px; font-weight: 900; margin: 5px 0 0 0; color: #111827;">${kpi_density} hab/km²</p>
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #6b7280;">(moyenne nationale: 106 hab/km²)</p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #e11d48; margin-bottom: 15px;">
            <p style="margin: 0; font-weight: bold; color: #9f1239;">Saturation des services (écoles, crèches) :</p>
            <p style="font-size: 22px; font-weight: 900; margin: 5px 0 0 0; color: #111827;">${kpi_saturation}% d'occupation</p>
          </div>

          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #e11d48; margin-bottom: 25px;">
            <p style="margin: 0; font-weight: bold; color: #9f1239;">Dette cumulée de la ville :</p>
            <p style="font-size: 22px; font-weight: 900; margin: 5px 0 0 0; color: #111827;">${kpi_debt}</p>
          </div>

          <p style="font-size: 16px;">Il est urgent de changer de direction pour stopper cette sur-densification et rétablir les équilibres de notre ville.</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://www.aimerboulogne.fr" style="display: inline-block; background-color: #059669; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Découvrir notre projet pour 2026
            </a>
          </div>
        </div>
        
        <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
          Vous recevez cet email suite à votre demande sur Boulogne Décrypté.
        </p>
      </body>
      </html>
    `

    // Call Resend API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Le Vrai Bilan <audit@en18ans.com>', // Verified domain
        to: [email],
        subject: `Votre audit quartier : ${neighborhood}`,
        html: htmlEmail,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
        console.error('Resend Error:', data)
        throw new Error(JSON.stringify(data))
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
