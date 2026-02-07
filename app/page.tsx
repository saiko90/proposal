'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, ArrowDown, Check, Music, Volume2, VolumeX, ChevronDown } from 'lucide-react';

// --- DATA ---
const DATA = {
  herName: "JULIE",
  hisName: "ALEX",
  chapters: [
    {
      id: 1,
      title: "Le Premier Regard",
      date: "Octobre 2018",
      text: "Un café, une écharpe rouge, et le temps qui s'arrête. Je ne savais pas encore que je venais de rencontrer mon destin.",
      image: "https://images.pexels.com/photos/206563/pexels-photo-206563.jpeg" // Bright outdoor couple
    },
    {
      id: 2,
      title: "L'Aventure",
      date: "Été 2019",
      text: "Londres sous la pluie, la Toscane au soleil. J'ai découvert que ma destination préférée, c'était simplement d'être avec toi.",
      image: "https://images.pexels.com/photos/29948290/pexels-photo-29948290.jpeg" // Bright beach
    },
    {
      id: 3,
      title: "L'Épreuve & La Force",
      date: "Hiver 2020",
      text: "Le monde fermé. Juste toi, moi, et 30m². On a appris que notre amour est plus grand que n'importe quel appartement.",
      image: "https://images.pexels.com/photos/10886638/pexels-photo-10886638.jpeg" // Cozy bright
    },
    {
      id: 4,
      title: "Le Nid",
      date: "Printemps 2023",
      text: "Les cartons, la peinture, nos premiers meubles. Bâtir un foyer, brique par brique, rire par rire.",
      image: "https://images.pexels.com/photos/4246097/pexels-photo-4246097.jpeg" // Home bright
    },
    {
      id: 5,
      title: "L'Évidence",
      date: "Aujourd'hui",
      text: "Je regarde notre passé avec gratitude. Je regarde notre avenir avec impatience. Il ne manque qu'une chose...",
      image: "https://images.pexels.com/photos/288008/pexels-photo-288008.jpeg" // Wedding ring vibes
    }
  ]
};

export default function ProposalLight() {
  const [step, setStep] = useState<'intro' | 'story' | 'yes'>('intro');
  const [audioEnabled, setAudioEnabled] = useState(false);

  // --- ACTIONS ---
  const handleStart = () => {
    setStep('story');
  };

  const handleYes = () => {
    setStep('yes');
    fireworks();
  };

  const fireworks = () => {
    const duration = 5000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#fb7185', '#ffffff', '#fcd34d'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#fb7185', '#ffffff', '#fcd34d'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  return (
    <div className="bg-[#fffbf7] text-slate-800 font-serif selection:bg-rose-200 selection:text-rose-900 h-screen w-full overflow-hidden relative">
      
      {/* Audio Button */}
      <button 
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/50 backdrop-blur border border-stone-200 text-stone-500 hover:text-rose-500 transition-colors shadow-sm"
      >
        {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {/* Main Content Area */}
      <AnimatePresence mode='wait'>
        {step === 'intro' && <Intro key="intro" onStart={handleStart} />}
        {step === 'story' && <StoryMode key="story" onYes={handleYes} />}
        {step === 'yes' && <Success key="yes" />}
      </AnimatePresence>
    </div>
  );
}

// --- SECTIONS ---

// 1. INTRO: Clean & Elegant
function Intro({ onStart }: any) {
    return (
        <motion.div 
            exit={{ opacity: 0, y: -50, transition: { duration: 0.8 } }}
            className="h-screen w-full flex flex-col items-center justify-center relative bg-[#fffbf7]"
        >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-center px-6 relative z-10"
            >
                <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm"
                >
                    <Heart className="w-6 h-6 text-rose-400" fill="currentColor" />
                </motion.div>
                
                <h2 className="text-sm font-sans font-bold tracking-[0.4em] text-stone-400 mb-6 uppercase">
                    Le Chapitre Un
                </h2>
                
                <h1 className="text-6xl md:text-9xl font-thin tracking-tighter mb-12 text-stone-800">
                    {DATA.herName} <span className="text-rose-400 font-serif italic">&</span> {DATA.hisName}
                </h1>

                <motion.button 
                    onClick={onStart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-10 py-5 overflow-hidden rounded-full bg-stone-900 text-white shadow-xl hover:shadow-2xl transition-all"
                >
                    <span className="relative z-10 font-sans text-xs font-bold uppercase tracking-[0.3em]">
                        Commencer l'histoire
                    </span>
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

// 2. STORY MODE: Snap Scrolling (Like TikTok/Reels but Horizontal/Vertical)
function StoryMode({ onYes }: any) {
    // Snap scroll container
    return (
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            <HeroSlide />
            {DATA.chapters.map((chapter, index) => (
                <ChapterSlide key={chapter.id} data={chapter} index={index} />
            ))}
            <QuestionSlide onYes={onYes} />
        </div>
    );
}

function HeroSlide() {
    return (
        <section className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden bg-white">
             <div className="absolute inset-0">
                 <img src="https://images.pexels.com/photos/772967/pexels-photo-772967.jpeg" className="w-full h-full object-cover opacity-80" />
                 <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
             </div>
             
             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center"
            >
                <h2 className="text-7xl md:text-9xl font-serif italic text-stone-900 mb-4">Notre Histoire</h2>
                <p className="text-stone-600 uppercase tracking-widest text-xs font-bold bg-white/50 px-4 py-2 rounded-full inline-block backdrop-blur-md">
                    Glisse vers le bas
                </p>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-8 text-stone-800 flex justify-center">
                    <ChevronDown />
                </motion.div>
             </motion.div>
        </section>
    )
}

function ChapterSlide({ data, index }: any) {
    const isEven = index % 2 === 0;

    return (
        <section className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden bg-[#fffbf7]">
            <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center gap-12">
                
                {/* Image Section */}
                <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className={`w-full md:w-1/2 h-[50vh] md:h-[70vh] relative ${isEven ? 'md:order-1' : 'md:order-2'}`}
                >
                    <div className="w-full h-full overflow-hidden rounded-[2rem] shadow-2xl relative">
                        <img src={data.image} className="w-full h-full object-cover" alt={data.title} />
                        <div className="absolute inset-0 border-[1px] border-white/20 rounded-[2rem] pointer-events-none"></div>
                    </div>
                    {/* Floating Date Badge */}
                    <div className="absolute -top-6 -right-6 md:-right-10 bg-white px-6 py-4 rounded-xl shadow-xl z-20 transform rotate-3">
                        <p className="font-sans font-bold text-stone-400 text-xs uppercase tracking-widest">Date</p>
                        <p className="font-serif text-xl text-stone-800">{data.date}</p>
                    </div>
                </motion.div>

                {/* Text Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: false }}
                    className={`w-full md:w-1/2 text-center md:text-left ${isEven ? 'md:order-2' : 'md:order-1'}`}
                >
                    <h3 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8 leading-tight">
                        {data.title}
                    </h3>
                    <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed">
                        {data.text}
                    </p>
                </motion.div>

            </div>
        </section>
    );
}

// 3. THE QUESTION (LIGHT & GOLD)
function QuestionSlide({ onYes }: any) {
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

    // La logique Mobile & Desktop pour faire fuir le bouton
    const dodge = () => {
        const x = (Math.random() - 0.5) * 250;
        const y = (Math.random() - 0.5) * 250;
        setNoBtnPos({ x, y });
    };

    return (
        <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center bg-white overflow-hidden">
            {/* Background animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-50 via-white to-amber-50 opacity-70"></div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                className="relative z-10 text-center px-6 max-w-4xl"
            >
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-8 flex items-center justify-center shadow-xl shadow-rose-100">
                    <Heart size={40} className="text-rose-500 fill-rose-500 animate-pulse" />
                </div>

                <h2 className="text-sm font-bold tracking-[0.4em] text-rose-400 uppercase mb-6">
                    Une dernière question...
                </h2>
                <h1 className="text-5xl md:text-8xl font-serif text-stone-900 mb-16 leading-tight">
                    {DATA.herName},<br/>
                    <span className="italic font-light text-stone-600">veux-tu m'épouser ?</span>
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative h-40">
                    <motion.button 
                        onClick={onYes}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-stone-900 text-white px-12 py-6 rounded-full font-bold text-xl uppercase tracking-widest shadow-2xl hover:bg-stone-800 transition-all flex items-center gap-3 z-20"
                    >
                         OUI <Check size={24} />
                    </motion.button>

                    <motion.button 
                        onMouseEnter={dodge} // Pour Desktop
                        onTouchStart={dodge} // Pour Mobile (dès qu'on touche, ça bouge !)
                        animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest text-stone-400 border border-stone-200 bg-white hover:bg-stone-50 transition-colors z-10"
                    >
                        Non
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}

// 4. SUCCESS
function Success() {
    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="h-screen w-full flex flex-col items-center justify-center bg-[#fffbf7] relative z-50"
        >
            <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                className="mb-8"
            >
                <Heart className="w-32 h-32 text-rose-500 fill-rose-500 drop-shadow-2xl" />
            </motion.div>
            
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-4 text-center px-4 text-stone-900">
                ELLE A DIT <span className="text-rose-500">OUI</span> !
            </h1>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                className="mt-12 pt-12 border-t border-stone-200"
            >
                <p className="font-serif italic text-2xl text-stone-500">Le 14 Février 2026</p>
            </motion.div>
        </motion.div>
    );
}