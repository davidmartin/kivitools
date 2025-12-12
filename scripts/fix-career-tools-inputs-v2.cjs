/**
 * Script to fix Career tools inputs in Appwrite
 * 
 * Run: node scripts/fix-career-tools-inputs-v2.mjs
 */

const { Client, Databases, Query } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = 'tools';

// Define correct inputs for each career tool type
const TOOL_INPUTS = {
    'resignation-letter-generator': {
        inputs: [
            { id: 'your_name', label: 'Your Name', type: 'text', placeholder: 'e.g., John Smith', required: true },
            { id: 'current_position', label: 'Current Position', type: 'text', placeholder: 'e.g., Senior Software Engineer', required: true },
            { id: 'company_name', label: 'Company Name', type: 'text', placeholder: 'e.g., Tech Corp Inc.', required: true },
            { id: 'last_day', label: 'Last Day of Work', type: 'text', placeholder: 'e.g., December 31, 2025 (or "two weeks from now")', required: true },
            { id: 'reason', label: 'Reason (Optional)', type: 'textarea', placeholder: 'e.g., Pursuing a new opportunity, Personal reasons, Career growth...', required: false },
            { id: 'tone', label: 'Tone', type: 'select', options: 'Professional,Grateful,Cordial,Formal', required: false }
        ],
        prompt_template: `You are a professional career advisor helping write a resignation letter.

Write a {{tone}} resignation letter for {{your_name}} who is resigning from their position as {{current_position}} at {{company_name}}.

Their last day of work will be: {{last_day}}

{{#if reason}}
Reason for leaving: {{reason}}
{{/if}}

The letter should:
1. Be professional and maintain good relationships
2. Express gratitude for opportunities
3. Offer to help with transition
4. Keep a positive tone throughout
5. Be concise but complete (200-300 words)

Write only the letter content, starting with the greeting and ending with the signature block (leave name as a placeholder).`
    },
    'cover-letter-generator': {
        inputs: [
            { id: 'job_title', label: 'Job Title Applying For', type: 'text', placeholder: 'e.g., Product Manager, Software Engineer', required: true },
            { id: 'company_name', label: 'Company Name', type: 'text', placeholder: 'e.g., Google, Amazon, StartupXYZ', required: true },
            { id: 'your_skills', label: 'Your Key Skills', type: 'textarea', placeholder: 'e.g., 5 years of Python, team leadership, agile methodology...', required: true },
            { id: 'your_experience', label: 'Relevant Experience', type: 'textarea', placeholder: 'e.g., Led a team of 8, increased revenue by 40%, built product from scratch...', required: true },
            { id: 'tone', label: 'Tone', type: 'select', options: 'Professional,Enthusiastic,Confident,Humble', required: false }
        ],
        prompt_template: `You are a professional career advisor helping write a compelling cover letter.

Write a {{tone}} cover letter for someone applying for the position of {{job_title}} at {{company_name}}.

Their key skills include:
{{your_skills}}

Their relevant experience:
{{your_experience}}

The cover letter should:
1. Have a strong opening that grabs attention
2. Highlight 2-3 key achievements with specific results
3. Show knowledge of the company (reference their mission/products)
4. Demonstrate enthusiasm for the role
5. End with a clear call-to-action
6. Be 300-400 words

Write only the letter content, professionally formatted with paragraphs.`
    },
    'resume-bullet-generator': {
        inputs: [
            { id: 'job_title', label: 'Job Title', type: 'text', placeholder: 'e.g., Marketing Manager, Software Developer', required: true },
            { id: 'task_or_achievement', label: 'Task or Achievement to Describe', type: 'textarea', placeholder: 'e.g., Managed social media accounts, Built new feature, Led team project...', required: true },
            { id: 'metrics', label: 'Metrics/Results (if any)', type: 'text', placeholder: 'e.g., 50% increase, $100K saved, 20 team members', required: false },
            { id: 'style', label: 'Style', type: 'select', options: 'Action-Oriented,Achievement-Focused,Technical,Leadership', required: false }
        ],
        prompt_template: `You are a resume writing expert helping create impactful bullet points.

Create 3-5 powerful resume bullet points for someone with the job title: {{job_title}}

The task or achievement to highlight:
{{task_or_achievement}}

{{#if metrics}}
Metrics/Results to include: {{metrics}}
{{/if}}

Style: {{style}}

Each bullet point should:
1. Start with a strong action verb
2. Be specific and quantifiable when possible
3. Show impact and results
4. Be concise (1-2 lines each)
5. Use the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]

Return only the bullet points, one per line, starting with •`
    }
};

// Input translations for Spanish
const SPANISH_INPUTS = {
    'resignation-letter-generator': [
        { id: 'your_name', label: 'Tu Nombre', type: 'text', placeholder: 'ej., Juan Pérez', required: true },
        { id: 'current_position', label: 'Puesto Actual', type: 'text', placeholder: 'ej., Ingeniero de Software Senior', required: true },
        { id: 'company_name', label: 'Nombre de la Empresa', type: 'text', placeholder: 'ej., Tech Corp S.A.', required: true },
        { id: 'last_day', label: 'Último Día de Trabajo', type: 'text', placeholder: 'ej., 31 de diciembre de 2025', required: true },
        { id: 'reason', label: 'Razón (Opcional)', type: 'textarea', placeholder: 'ej., Nueva oportunidad, Razones personales...', required: false },
        { id: 'tone', label: 'Tono', type: 'select', options: 'Profesional,Agradecido,Cordial,Formal', required: false }
    ],
    'cover-letter-generator': [
        { id: 'job_title', label: 'Puesto al que Aplicas', type: 'text', placeholder: 'ej., Gerente de Producto, Ingeniero', required: true },
        { id: 'company_name', label: 'Nombre de la Empresa', type: 'text', placeholder: 'ej., Google, Amazon', required: true },
        { id: 'your_skills', label: 'Tus Habilidades Clave', type: 'textarea', placeholder: 'ej., 5 años de Python, liderazgo, metodología ágil...', required: true },
        { id: 'your_experience', label: 'Experiencia Relevante', type: 'textarea', placeholder: 'ej., Lideré un equipo de 8, aumenté ingresos 40%...', required: true },
        { id: 'tone', label: 'Tono', type: 'select', options: 'Profesional,Entusiasta,Seguro,Humilde', required: false }
    ],
    'resume-bullet-generator': [
        { id: 'job_title', label: 'Título del Puesto', type: 'text', placeholder: 'ej., Gerente de Marketing, Desarrollador', required: true },
        { id: 'task_or_achievement', label: 'Tarea o Logro a Describir', type: 'textarea', placeholder: 'ej., Gestioné redes sociales, Construí nueva función...', required: true },
        { id: 'metrics', label: 'Métricas/Resultados', type: 'text', placeholder: 'ej., 50% de aumento, $100K ahorrados', required: false },
        { id: 'style', label: 'Estilo', type: 'select', options: 'Orientado a Acción,Enfocado en Logros,Técnico,Liderazgo', required: false }
    ]
};

async function updateToolInputs() {
    console.log('🔧 Starting Career Tools Input Fix...\n');

    let updatedCount = 0;
    let errorCount = 0;

    for (const [slug, config] of Object.entries(TOOL_INPUTS)) {
        console.log(`\n📝 Processing: ${slug}`);

        // Process English first
        try {
            const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.equal('slug', slug),
                Query.equal('language', 'en'),
                Query.limit(1)
            ]);

            if (result.documents.length > 0) {
                const doc = result.documents[0];

                await databases.updateDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    doc.$id,
                    {
                        inputs: JSON.stringify(config.inputs),
                        prompt_template: config.prompt_template
                    }
                );

                console.log(`  ✅ [en] Updated successfully`);
                updatedCount++;
            } else {
                console.log(`  ⚠️ [en] Tool not found`);
            }
        } catch (err) {
            console.log(`  ❌ [en] Error: ${err.message}`);
            errorCount++;
        }

        // Process Spanish
        if (SPANISH_INPUTS[slug]) {
            try {
                const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                    Query.equal('slug', slug),
                    Query.equal('language', 'es'),
                    Query.limit(1)
                ]);

                if (result.documents.length > 0) {
                    const doc = result.documents[0];

                    await databases.updateDocument(
                        DATABASE_ID,
                        COLLECTION_ID,
                        doc.$id,
                        {
                            inputs: JSON.stringify(SPANISH_INPUTS[slug])
                        }
                    );

                    console.log(`  ✅ [es] Updated successfully`);
                    updatedCount++;
                } else {
                    console.log(`  ⚠️ [es] Tool not found`);
                }
            } catch (err) {
                console.log(`  ❌ [es] Error: ${err.message}`);
                errorCount++;
            }
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Updated: ${updatedCount} documents`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(50));
}

updateToolInputs().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
