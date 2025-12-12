import { Client, Databases, Query } from "node-appwrite";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;

// WhatsApp tools with proper quality content
const WHATSAPP_TOOLS_FIX = {
    "business-message": {
        descriptions: {
            en: "Craft professional WhatsApp Business messages that convert leads into customers. From welcome messages to payment reminders, get templates that sound human but work 24/7.",
            es: "Crea mensajes profesionales de WhatsApp Business que convierten leads en clientes. Desde mensajes de bienvenida hasta recordatorios de pago, obtén plantillas que suenan humanas pero funcionan 24/7.",
            pt: "Crie mensagens profissionais do WhatsApp Business que convertem leads em clientes. De mensagens de boas-vindas a lembretes de pagamento, obtenha templates que soam humanos mas funcionam 24/7.",
            fr: "Créez des messages WhatsApp Business professionnels qui convertissent les prospects en clients. Des messages de bienvenue aux rappels de paiement, obtenez des modèles qui sonnent humains mais fonctionnent 24h/24.",
            de: "Erstellen Sie professionelle WhatsApp Business-Nachrichten, die Leads in Kunden verwandeln. Von Willkommensnachrichten bis zu Zahlungserinnerungen - Vorlagen, die menschlich klingen, aber rund um die Uhr funktionieren.",
            it: "Crea messaggi WhatsApp Business professionali che convertono lead in clienti. Dai messaggi di benvenuto ai promemoria di pagamento, ottieni template che suonano umani ma funzionano 24/7."
        },
        inputs: JSON.stringify([
            {
                id: "messageType",
                label: "Message Type",
                type: "select",
                options: "Welcome Message,Order Confirmation,Shipping Update,Payment Reminder,Follow-up,Appointment Reminder,Promotional Offer,Customer Support Response,Feedback Request,Thank You Message"
            },
            {
                id: "businessType",
                label: "Business Type",
                type: "text",
                placeholder: "e.g., Restaurant, Online Store, Clinic, Salon..."
            },
            {
                id: "customerName",
                label: "Customer Name (optional)",
                type: "text",
                placeholder: "Leave empty for generic template"
            },
            {
                id: "tone",
                label: "Tone",
                type: "select",
                options: "Professional,Friendly,Casual,Formal,Warm"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a WhatsApp Business communication expert. Create a professional message based on:

**Message Type:** {messageType}
**Business Type:** {businessType}
**Customer Name:** {customerName}
**Tone:** {tone}
**Language:** {language}

Generate a WhatsApp Business message that:
1. Opens with a personalized greeting (use customer name if provided)
2. Gets straight to the point (WhatsApp users prefer concise messages)
3. Includes relevant emojis sparingly (1-3 max)
4. Has a clear call-to-action when appropriate
5. Feels human and warm, not robotic
6. Is formatted for mobile reading (short paragraphs)

For each message type, follow these guidelines:
- Welcome Message: Introduce the business warmly, set expectations
- Order Confirmation: Include order details, next steps
- Shipping Update: Tracking info, expected delivery
- Payment Reminder: Polite but clear, include amount and methods
- Follow-up: Check on satisfaction, offer assistance
- Promotional: Highlight value, include deadline if applicable

Provide 3 variations of the message with slightly different approaches.`
    },

    "status-ideas": {
        descriptions: {
            en: "Get WhatsApp status ideas that actually get views and replies. From inspirational quotes to business promotions, create statuses that make people stop scrolling.",
            es: "Obtén ideas para estados de WhatsApp que realmente consiguen vistas y respuestas. Desde frases inspiradoras hasta promociones de negocio, crea estados que hacen que la gente deje de hacer scroll.",
            pt: "Obtenha ideias para status do WhatsApp que realmente ganham visualizações e respostas. De citações inspiradoras a promoções de negócios, crie status que fazem as pessoas pararem de rolar.",
            fr: "Obtenez des idées de statuts WhatsApp qui obtiennent vraiment des vues et des réponses. Des citations inspirantes aux promotions commerciales, créez des statuts qui font s'arrêter les gens.",
            de: "Erhalten Sie WhatsApp-Status-Ideen, die wirklich Views und Antworten bekommen. Von inspirierenden Zitaten bis zu Geschäftswerbung - erstellen Sie Status, die Leute zum Anhalten bringen.",
            it: "Ottieni idee per lo stato WhatsApp che ottengono davvero visualizzazioni e risposte. Dalle citazioni ispiratrici alle promozioni aziendali, crea stati che fermano lo scrolling."
        },
        inputs: JSON.stringify([
            {
                id: "statusType",
                label: "Status Type",
                type: "select",
                options: "Motivational Quote,Business Promotion,Personal Update,Funny/Humor,Life Wisdom,Product Showcase,Behind-the-Scenes,Announcement,Mood/Vibe,Question/Poll"
            },
            {
                id: "context",
                label: "Context/Theme",
                type: "text",
                placeholder: "e.g., Monday motivation, new product launch, weekend vibes..."
            },
            {
                id: "targetAudience",
                label: "Target Audience",
                type: "select",
                options: "Friends & Family,Business Contacts,Customers,Mixed Audience,Young Adults,Professionals"
            },
            {
                id: "includeEmojis",
                label: "Emoji Style",
                type: "select",
                options: "Minimal (1-2),Moderate (3-5),Expressive (5+),No Emojis"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a social media content expert specializing in WhatsApp statuses. Create engaging status ideas based on:

**Status Type:** {statusType}
**Context/Theme:** {context}
**Target Audience:** {targetAudience}
**Emoji Style:** {includeEmojis}
**Language:** {language}

Generate 5 unique WhatsApp status ideas that:
1. Are concise (under 250 characters ideally for full visibility)
2. Create curiosity or emotional connection
3. Encourage replies or reactions
4. Match the specified emoji style
5. Feel authentic, not generic or copy-pasted

For each status type:
- Motivational: Fresh takes, not overused quotes
- Business Promotion: Subtle, value-focused, not salesy
- Personal Update: Relatable, conversation-starting
- Funny/Humor: Clever wordplay, universal humor
- Product Showcase: Benefits over features, curiosity-driven

Format each status on a new line with a number.
Include a brief tip on the best time to post for maximum visibility.`
    },

    "quick-replies": {
        descriptions: {
            en: "Build a library of quick reply templates that handle 80% of customer questions in seconds. Save hours of typing the same responses while keeping that personal touch.",
            es: "Crea una biblioteca de respuestas rápidas que manejan el 80% de las preguntas de clientes en segundos. Ahorra horas de escribir las mismas respuestas manteniendo ese toque personal.",
            pt: "Construa uma biblioteca de respostas rápidas que lidam com 80% das perguntas dos clientes em segundos. Economize horas digitando as mesmas respostas mantendo aquele toque pessoal.",
            fr: "Créez une bibliothèque de réponses rapides qui gèrent 80% des questions clients en quelques secondes. Économisez des heures de frappe tout en gardant cette touche personnelle.",
            de: "Erstellen Sie eine Bibliothek von Schnellantworten, die 80% der Kundenfragen in Sekunden beantworten. Sparen Sie Stunden beim Tippen der gleichen Antworten und behalten Sie die persönliche Note.",
            it: "Crea una libreria di risposte rapide che gestiscono l'80% delle domande dei clienti in secondi. Risparmia ore di digitazione mantenendo quel tocco personale."
        },
        inputs: JSON.stringify([
            {
                id: "businessCategory",
                label: "Business Category",
                type: "select",
                options: "E-commerce/Online Store,Restaurant/Food Delivery,Health & Wellness,Beauty & Salon,Professional Services,Education/Courses,Real Estate,Travel & Tourism,Automotive,General Retail"
            },
            {
                id: "replyCategory",
                label: "Reply Category",
                type: "select",
                options: "Pricing & Payments,Shipping & Delivery,Product/Service Info,Hours & Availability,Returns & Refunds,Booking & Appointments,Technical Support,General Inquiry,Complaints Handling,Order Status"
            },
            {
                id: "brandVoice",
                label: "Brand Voice",
                type: "select",
                options: "Professional & Polished,Friendly & Casual,Warm & Caring,Energetic & Fun,Luxurious & Exclusive"
            },
            {
                id: "includeVariables",
                label: "Include Placeholders",
                type: "select",
                options: "Yes (with [brackets]),No (generic templates)"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a customer service optimization expert. Create quick reply templates for WhatsApp Business based on:

**Business Category:** {businessCategory}
**Reply Category:** {replyCategory}
**Brand Voice:** {brandVoice}
**Include Placeholders:** {includeVariables}
**Language:** {language}

Generate 5 quick reply templates that:
1. Answer the specific question/concern completely
2. Anticipate follow-up questions and address them
3. Include a helpful next step or call-to-action
4. Sound natural and conversational (not robotic)
5. Are easy to personalize quickly if needed
6. Use appropriate emojis based on brand voice (1-2 max)

If placeholders are requested, use format: [CUSTOMER_NAME], [ORDER_NUMBER], [PRODUCT], [DATE], [PRICE], [TIME], etc.

For each template provide:
- The quick reply text (ready to copy-paste)
- Suggested shortcut keyword (e.g., /price, /hours, /status)
- When to use this reply

Format clearly with separators between each template.`
    }
};

async function fixWhatsAppTools() {
    console.log("🔧 Fixing WhatsApp tools...\n");

    for (const [slug, fixes] of Object.entries(WHATSAPP_TOOLS_FIX)) {
        console.log(`\n📝 Updating: ${slug}`);

        // Find all language versions of this tool
        const result = await databases.listDocuments(DATABASE_ID, "tools", [
            Query.equal("platform", "whatsapp"),
            Query.equal("slug", slug),
            Query.limit(10),
        ]);

        if (result.documents.length === 0) {
            console.log(`   ⚠️ Tool not found: ${slug}`);
            continue;
        }

        for (const doc of result.documents) {
            const lang = doc.language || "en";
            const description = fixes.descriptions[lang] || fixes.descriptions.en;

            try {
                await databases.updateDocument(DATABASE_ID, "tools", doc.$id, {
                    description: description,
                    inputs: fixes.inputs,
                    prompt_template: fixes.prompt_template,
                });
                console.log(`   ✅ Updated ${lang} version`);
            } catch (error) {
                console.log(`   ❌ Failed ${lang}: ${error.message}`);
            }
        }
    }

    console.log("\n✅ WhatsApp tools update complete!");
    console.log("\n📊 Running audit to verify...\n");

    // Run audit to verify
    const result = await databases.listDocuments(DATABASE_ID, "tools", [
        Query.equal("platform", "whatsapp"),
        Query.equal("language", "en"),
        Query.limit(50),
    ]);

    let passed = 0;
    let failed = 0;

    for (const tool of result.documents) {
        const issues = [];

        const badDescPatterns = ["Generate amazing", "Generate high-quality"];
        const hasGenericDesc = badDescPatterns.some((p) => tool.description?.includes(p));
        if (!tool.description || hasGenericDesc || tool.description.length < 50) {
            issues.push("❌ Description");
        }

        let inputs = [];
        try {
            inputs = typeof tool.inputs === "string" ? JSON.parse(tool.inputs) : tool.inputs;
        } catch (e) { }
        if (!inputs || inputs.length < 2) {
            issues.push("❌ Inputs");
        }

        if (!tool.prompt_template || tool.prompt_template.length < 200) {
            issues.push("❌ Prompt");
        }

        if (issues.length > 0) {
            console.log(`🔴 ${tool.name} - ${issues.join(", ")}`);
            failed++;
        } else {
            console.log(`🟢 ${tool.name} - OK`);
            passed++;
        }
    }

    console.log(`\n📈 FINAL: ${passed}/${passed + failed} tools passed (${Math.round((passed / (passed + failed)) * 100)}%)`);
}

fixWhatsAppTools().catch(console.error);
