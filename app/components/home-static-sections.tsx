"use client";

import { Card, Accordion } from "@heroui/react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

import PicturaliaBanner from "./picturalia-banner";

const FAQS = [
    { q: "home.faq.q1", a: "home.faq.a1" },
    { q: "home.faq.q2", a: "home.faq.a2" },
    { q: "home.faq.q3", a: "home.faq.a3" },
    { q: "home.faq.q4", a: "home.faq.a4" },
    { q: "home.faq.q5", a: "home.faq.a5" },
];

export default function HomeStaticSections() {
    const { t } = useLanguage();

    return (
        <>
            {/* Features Section - Simplified animations */}
            <section className="py-32 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-surface/30 backdrop-blur-sm -z-10" />
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-20">
                        {t("home.features.title")}
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="glass p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
                            <div className="text-5xl mb-6">🚀</div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                {t("home.features.free.title")}
                            </h3>
                            <p className="text-muted">
                                {t("home.features.free.description")}
                            </p>
                        </div>

                        <div className="glass p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
                            <div className="text-5xl mb-6">⚡</div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                {t("home.features.noSignup.title")}
                            </h3>
                            <p className="text-muted">
                                {t("home.features.noSignup.description")}
                            </p>
                        </div>

                        <div className="glass p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
                            <div className="text-5xl mb-6">🤖</div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                {t("home.features.aiPowered.title")}
                            </h3>
                            <p className="text-muted mb-4">
                                {t("home.features.aiPowered.description")}
                            </p>
                            <Link href="/about/technology" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                                {t("home.features.aiPowered.learnMore")}
                            </Link>
                        </div>

                        <div className="glass p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
                            <div className="text-5xl mb-6">🌍</div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                {t("home.features.multiLanguage.title")}
                            </h3>
                            <p className="text-muted">
                                {t("home.features.multiLanguage.description")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                        {t("stats.title")}
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center p-6 glass rounded-2xl">
                            <div className="text-5xl font-black text-gradient mb-2">50K+</div>
                            <p className="text-muted font-medium">{t("stats.creators")}</p>
                        </div>
                        <div className="text-center p-6 glass rounded-2xl">
                            <div className="text-5xl font-black text-gradient mb-2">1M+</div>
                            <p className="text-muted font-medium">{t("stats.content")}</p>
                        </div>
                        <div className="text-center p-6 glass rounded-2xl">
                            <div className="text-5xl font-black text-gradient mb-2">100K+</div>
                            <p className="text-muted font-medium">{t("stats.time")}</p>
                        </div>
                        <div className="text-center p-6 glass rounded-2xl">
                            <div className="text-5xl font-black text-gradient mb-2">28</div>
                            <p className="text-muted font-medium">{t("stats.platforms")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Picturalia Banner Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <PicturaliaBanner />
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-32 px-4 relative">
                <div className="absolute inset-0 bg-surface/30 backdrop-blur-sm -z-10" />
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            {t("testimonials.title")}
                        </h2>
                        <p className="text-muted text-lg">{t("testimonials.subtitle")}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card key={i} className="glass-card border-white/10 bg-white/5">
                                <Card.Content className="p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="flex-1">
                                            <div className="font-bold text-foreground text-lg">
                                                {t(`testimonials.t${i}.name`)}
                                            </div>
                                            <div className="text-sm text-primary font-medium">
                                                {t(`testimonials.t${i}.role`)}
                                            </div>
                                        </div>
                                        <div className="text-xl" aria-label="5 stars">⭐⭐⭐⭐⭐</div>
                                    </div>
                                    <p className="text-muted italic leading-relaxed">&quot;{t(`testimonials.t${i}.text`)}&quot;</p>
                                </Card.Content>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 bg-surface/30">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t("home.faq.title")}
                        </h2>
                        <p className="text-muted text-lg">
                            {t("home.faq.subtitle")}
                        </p>
                    </div>

                    <Accordion className="w-full" variant="surface">
                        {FAQS.map((faq, index) => (
                            <Accordion.Item key={index} className="group mb-2 rounded-xl border border-white/5 bg-white/5 px-2 data-[open=true]:bg-white/10 transition-colors">
                                <Accordion.Heading>
                                    <Accordion.Trigger className="py-4 text-lg font-medium text-foreground">
                                        {t(faq.q)}
                                        <Accordion.Indicator className="text-muted group-data-[open=true]:rotate-180 transition-transform">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Accordion.Indicator>
                                    </Accordion.Trigger>
                                </Accordion.Heading>
                                <Accordion.Panel>
                                    <Accordion.Body className="pb-4 text-muted leading-relaxed">
                                        {t(faq.a)}
                                    </Accordion.Body>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* SEO Footer Section */}
            <section className="py-12 px-4 border-t border-border/10 bg-surface/5">
                <div className="max-w-5xl mx-auto text-center opacity-40 hover:opacity-100 transition-opacity duration-500">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        {t("home.seoFooter.title")}
                    </h2>
                    <div className="text-muted leading-relaxed space-y-4 text-xs md:text-sm">
                        <p>{t("home.seoFooter.text")}</p>
                    </div>
                </div>
            </section>
        </>
    );
}
