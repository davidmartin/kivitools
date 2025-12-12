/**
 * Script to fix Career tools inputs in Appwrite
 * 
 * Problem: Career tools have generic "topic" inputs that don't make sense
 * for job-related content like resignation letters, cover letters, etc.
 * 
 * This script updates the inputs to be specific to each tool type.
 */

import { Client, Databases, Query } from 'node-appwrite';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

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
    },
    'resume-summary': {
        inputs: [
            { id: 'current_role', label: 'Current/Target Role', type: 'text', placeholder: 'e.g., Data Scientist, Product Manager', required: true },
            { id: 'years_experience', label: 'Years of Experience', type: 'text', placeholder: 'e.g., 5 years, 10+ years', required: true },
            { id: 'key_skills', label: 'Key Skills', type: 'textarea', placeholder: 'e.g., Python, Machine Learning, Team Leadership, Agile...', required: true },
            { id: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g., FinTech, Healthcare, E-commerce', required: false },
            { id: 'tone', label: 'Tone', type: 'select', options: 'Professional,Dynamic,Results-Driven,Innovative', required: false }
        ],
        prompt_template: `You are a resume writing expert creating a professional summary.

Write a {{tone}} professional resume summary for:
- Role: {{current_role}}
- Experience: {{years_experience}}
- Key Skills: {{key_skills}}
{{#if industry}}
- Industry: {{industry}}
{{/if}}

The summary should:
1. Be 3-4 sentences (50-75 words)
2. Highlight the most impressive achievements
3. Include quantifiable results if possible
4. Show value proposition clearly
5. Be written in first person implied (no "I")

Write only the summary paragraph.`
    },
    'linkedin-headline': {
        inputs: [
            { id: 'job_title', label: 'Current/Target Job Title', type: 'text', placeholder: 'e.g., Senior Software Engineer', required: true },
            { id: 'specialty', label: 'Your Specialty/Expertise', type: 'text', placeholder: 'e.g., AI/ML, Growth Marketing, SaaS Sales', required: true },
            { id: 'value_proposition', label: 'What Value Do You Provide?', type: 'text', placeholder: 'e.g., Helping startups scale, Building products users love', required: false },
            { id: 'style', label: 'Headline Style', type: 'select', options: 'Professional,Creative,Results-Focused,Personal Brand', required: false }
        ],
        prompt_template: `You are a LinkedIn profile optimization expert.

Create 5 compelling LinkedIn headline options for:
- Job Title: {{job_title}}
- Specialty: {{specialty}}
{{#if value_proposition}}
- Value Proposition: {{value_proposition}}
{{/if}}
- Style: {{style}}

Each headline should:
1. Be under 120 characters
2. Include relevant keywords for searchability
3. Show unique value
4. Be memorable and professional
5. Consider using | or • to separate elements

Return 5 options, numbered 1-5, one per line.`
    },
    'interview-prep': {
        inputs: [
            { id: 'interview_question', label: 'Interview Question', type: 'textarea', placeholder: 'e.g., Tell me about yourself, What is your greatest weakness?', required: true },
            { id: 'job_title', label: 'Job Title You\'re Interviewing For', type: 'text', placeholder: 'e.g., Product Manager, Software Engineer', required: true },
            { id: 'your_background', label: 'Your Relevant Background', type: 'textarea', placeholder: 'e.g., 5 years in marketing, led team of 10, increased sales by 30%...', required: true },
            { id: 'answer_style', label: 'Answer Style', type: 'select', options: 'STAR Method,Concise,Storytelling,Technical', required: false }
        ],
        prompt_template: `You are an interview coach helping prepare strong answers.

Help prepare an answer using the {{answer_style}} approach for this interview question:
"{{interview_question}}"

The candidate is interviewing for: {{job_title}}

Their relevant background:
{{your_background}}

Provide:
1. A strong sample answer (2-3 paragraphs)
2. Key points to remember
3. What NOT to say
4. Follow-up questions they might ask

Make the answer authentic, specific, and impressive while staying professional.`
    },
    'skill-summary': {
        inputs: [
            { id: 'skills_list', label: 'Your Skills', type: 'textarea', placeholder: 'e.g., Python, JavaScript, Project Management, Data Analysis, Team Leadership...', required: true },
            { id: 'proficiency_context', label: 'Context/Proficiency', type: 'textarea', placeholder: 'e.g., 5 years Python, beginner React, certified in AWS...', required: false },
            { id: 'target_role', label: 'Target Role', type: 'text', placeholder: 'e.g., Full Stack Developer, Marketing Manager', required: false },
            { id: 'format', label: 'Format', type: 'select', options: 'Grouped by Category,Single List,With Proficiency Levels,Technical Focus', required: false }
        ],
        prompt_template: `You are a resume optimization expert creating skills sections.

Create a well-organized skills section using {{format}} format for:

Skills:
{{skills_list}}

{{#if proficiency_context}}
Context/Proficiency: {{proficiency_context}}
{{/if}}

{{#if target_role}}
Target Role: {{target_role}}
{{/if}}

The skills section should:
1. Be organized logically (by category or relevance)
2. Prioritize skills most relevant to target role
3. Be scannable and easy to read
4. Include both hard and soft skills if provided
5. Use consistent formatting

Return the formatted skills section ready for a resume.`
    }
};

// Input translations for other languages
const INPUT_TRANSLATIONS = {
    'resignation-letter-generator': {
        es: {
            inputs: [
                { id: 'your_name', label: 'Tu Nombre', type: 'text', placeholder: 'ej., Juan Pérez', required: true },
                { id: 'current_position', label: 'Puesto Actual', type: 'text', placeholder: 'ej., Ingeniero de Software Senior', required: true },
                { id: 'company_name', label: 'Nombre de la Empresa', type: 'text', placeholder: 'ej., Tech Corp S.A.', required: true },
                { id: 'last_day', label: 'Último Día de Trabajo', type: 'text', placeholder: 'ej., 31 de diciembre de 2025 (o "en dos semanas")', required: true },
                { id: 'reason', label: 'Razón (Opcional)', type: 'textarea', placeholder: 'ej., Nueva oportunidad, Razones personales, Crecimiento profesional...', required: false },
                { id: 'tone', label: 'Tono', type: 'select', options: 'Profesional,Agradecido,Cordial,Formal', required: false }
            ]
        },
        pt: {
            inputs: [
                { id: 'your_name', label: 'Seu Nome', type: 'text', placeholder: 'ex., João Silva', required: true },
                { id: 'current_position', label: 'Cargo Atual', type: 'text', placeholder: 'ex., Engenheiro de Software Sênior', required: true },
                { id: 'company_name', label: 'Nome da Empresa', type: 'text', placeholder: 'ex., Tech Corp Ltda.', required: true },
                { id: 'last_day', label: 'Último Dia de Trabalho', type: 'text', placeholder: 'ex., 31 de dezembro de 2025 (ou "em duas semanas")', required: true },
                { id: 'reason', label: 'Motivo (Opcional)', type: 'textarea', placeholder: 'ex., Nova oportunidade, Razões pessoais, Crescimento profissional...', required: false },
                { id: 'tone', label: 'Tom', type: 'select', options: 'Profissional,Grato,Cordial,Formal', required: false }
            ]
        },
        fr: {
            inputs: [
                { id: 'your_name', label: 'Votre Nom', type: 'text', placeholder: 'ex., Jean Dupont', required: true },
                { id: 'current_position', label: 'Poste Actuel', type: 'text', placeholder: 'ex., Ingénieur Logiciel Senior', required: true },
                { id: 'company_name', label: 'Nom de l\'Entreprise', type: 'text', placeholder: 'ex., Tech Corp SAS', required: true },
                { id: 'last_day', label: 'Dernier Jour de Travail', type: 'text', placeholder: 'ex., 31 décembre 2025 (ou "dans deux semaines")', required: true },
                { id: 'reason', label: 'Raison (Optionnel)', type: 'textarea', placeholder: 'ex., Nouvelle opportunité, Raisons personnelles, Évolution de carrière...', required: false },
                { id: 'tone', label: 'Ton', type: 'select', options: 'Professionnel,Reconnaissant,Cordial,Formel', required: false }
            ]
        },
        de: {
            inputs: [
                { id: 'your_name', label: 'Ihr Name', type: 'text', placeholder: 'z.B., Hans Müller', required: true },
                { id: 'current_position', label: 'Aktuelle Position', type: 'text', placeholder: 'z.B., Senior Software-Ingenieur', required: true },
                { id: 'company_name', label: 'Firmenname', type: 'text', placeholder: 'z.B., Tech Corp GmbH', required: true },
                { id: 'last_day', label: 'Letzter Arbeitstag', type: 'text', placeholder: 'z.B., 31. Dezember 2025 (oder "in zwei Wochen")', required: true },
                { id: 'reason', label: 'Grund (Optional)', type: 'textarea', placeholder: 'z.B., Neue Möglichkeit, Persönliche Gründe, Berufliches Wachstum...', required: false },
                { id: 'tone', label: 'Ton', type: 'select', options: 'Professionell,Dankbar,Herzlich,Formell', required: false }
            ]
        },
        it: {
            inputs: [
                { id: 'your_name', label: 'Il Tuo Nome', type: 'text', placeholder: 'es., Mario Rossi', required: true },
                { id: 'current_position', label: 'Posizione Attuale', type: 'text', placeholder: 'es., Ingegnere Software Senior', required: true },
                { id: 'company_name', label: 'Nome Azienda', type: 'text', placeholder: 'es., Tech Corp S.r.l.', required: true },
                { id: 'last_day', label: 'Ultimo Giorno di Lavoro', type: 'text', placeholder: 'es., 31 dicembre 2025 (o "tra due settimane")', required: true },
                { id: 'reason', label: 'Motivo (Opzionale)', type: 'textarea', placeholder: 'es., Nuova opportunità, Motivi personali, Crescita professionale...', required: false },
                { id: 'tone', label: 'Tono', type: 'select', options: 'Professionale,Grato,Cordiale,Formale', required: false }
            ]
        }
    }
    // Add translations for other tools as needed
};

async function updateToolInputs() {
    console.log('🔧 Starting Career Tools Input Fix...\n');

    let updatedCount = 0;
    let errorCount = 0;

    for (const [slug, config] of Object.entries(TOOL_INPUTS)) {
        console.log(`\n📝 Processing: ${slug}`);

        // Get all language versions of this tool
        const languages = ['en', 'es', 'pt', 'fr', 'de', 'it'];

        for (const lang of languages) {
            try {
                // Find the tool document
                const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                    Query.equal('slug', slug),
                    Query.equal('language', lang),
                    Query.limit(1)
                ]);

                if (result.documents.length === 0) {
                    console.log(`  ⚠️ [${lang}] Tool not found`);
                    continue;
                }

                const doc = result.documents[0];

                // Get the correct inputs for this language
                let inputs;
                if (lang === 'en') {
                    inputs = config.inputs;
                } else if (INPUT_TRANSLATIONS[slug]?.[lang]?.inputs) {
                    inputs = INPUT_TRANSLATIONS[slug][lang].inputs;
                } else {
                    // Fall back to English if no translation available
                    inputs = config.inputs;
                }

                // Update the document
                const updateData = {
                    inputs: JSON.stringify(inputs)
                };

                // Add prompt template only for English (or if it should be the same)
                if (lang === 'en' && config.prompt_template) {
                    updateData.prompt_template = config.prompt_template;
                }

                await databases.updateDocument(
                    DATABASE_ID,
                    COLLECTION_ID,
                    doc.$id,
                    updateData
                );

                console.log(`  ✅ [${lang}] Updated successfully`);
                updatedCount++;

            } catch (err) {
                console.log(`  ❌ [${lang}] Error: ${err.message}`);
                errorCount++;
            }
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Updated: ${updatedCount} documents`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(50));
}

updateToolInputs().catch(console.error);
