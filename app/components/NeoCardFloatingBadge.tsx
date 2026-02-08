'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpLeft, Sparkles, X } from 'lucide-react';

/**
 * NeoCardFloatingBadge
 * 
 * Bouton flottant premium à placer sur TOUTES les démos NeoCard.
 * Se positionne en haut à gauche, reste fixe au scroll.
 * 
 * USAGE : Ajouter simplement <NeoCardFloatingBadge /> dans le return 
 * de n'importe quelle page démo, AVANT la fermeture du </div> principal.
 * 
 * PROPS optionnelles :
 * - theme: 'light' | 'dark' (défaut: 'auto' — détecte le fond)
 * - href: string (défaut: 'https://neocard.ch')
 */

type Theme = 'light' | 'dark';

interface NeoCardFloatingBadgeProps {
  theme?: Theme;
  href?: string;
}

export default function NeoCardFloatingBadge({ 
  theme = 'dark', 
  href = 'https://neocard.ch' 
}: NeoCardFloatingBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed top-5 left-5 z-[9999] font-sans" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* --- BADGE COMPACT --- */
          <motion.button
            key="badge"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => setIsExpanded(true)}
            className={`
              group flex items-center gap-2.5 px-4 py-2.5 rounded-full
              backdrop-blur-xl shadow-lg border cursor-pointer
              transition-all duration-300 hover:shadow-xl
              ${isDark 
                ? 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:text-white hover:border-white/30' 
                : 'bg-black/5 border-black/10 text-slate-600 hover:bg-black/10 hover:text-slate-900 hover:border-black/20'
              }
            `}
            aria-label="Retour vers NeoCard.ch"
          >
            {/* Logo N animé */}
            <span className={`
              w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black tracking-tight
              ${isDark
                ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black'
                : 'bg-gradient-to-br from-amber-400 to-amber-600 text-black'
              }
            `}>
              N
            </span>

            <span className="text-[11px] font-semibold uppercase tracking-widest">
              NeoCard
            </span>

            {/* Petit indicateur "demo" */}
            <span className={`
              text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full
              ${isDark
                ? 'bg-amber-500/20 text-amber-300'
                : 'bg-amber-500/15 text-amber-600'
              }
            `}>
              Démo
            </span>
          </motion.button>
        ) : (
          /* --- PANEL ÉTENDU --- */
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`
              rounded-2xl overflow-hidden shadow-2xl border backdrop-blur-2xl
              ${isDark
                ? 'bg-black/70 border-white/15 text-white'
                : 'bg-white/80 border-black/10 text-slate-900'
              }
            `}
            style={{ width: 280 }}
          >
            {/* Header */}
            <div className="p-5 pb-4 relative">
              <button
                onClick={() => setIsExpanded(false)}
                className={`
                  absolute top-3 right-3 p-1.5 rounded-full transition-colors
                  ${isDark
                    ? 'text-white/40 hover:text-white hover:bg-white/10'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }
                `}
                aria-label="Fermer"
              >
                <X size={14} />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-sm shadow-lg shadow-amber-500/20">
                  N
                </span>
                <div>
                  <p className="text-sm font-bold tracking-wide">NeoCard</p>
                  <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                    Architecte de vos Souvenirs
                  </p>
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                Vous consultez une <strong className={isDark ? 'text-white/80' : 'text-slate-700'}>démo interactive</strong>.
                Envie du même résultat pour votre événement ?
              </p>
            </div>

            {/* Séparateur */}
            <div className={`h-px ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />

            {/* Actions */}
            <div className="p-4 space-y-2.5">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:from-amber-400 hover:to-amber-500 transition-all"
              >
                <Sparkles size={14} />
                Découvrir NeoCard
              </a>

              <a
                href={`${href}#celebrations`}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all border
                  ${isDark
                    ? 'border-white/10 text-white/70 hover:bg-white/5 hover:text-white'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <ArrowUpLeft size={14} />
                Voir toutes les offres
              </a>
            </div>

            {/* Footer discret */}
            <div className={`px-4 pb-3 flex justify-between items-center`}>
              <p className={`text-[9px] uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-slate-300'}`}>
                Basé en Valais, Suisse
              </p>
              <button 
                onClick={() => setIsDismissed(true)}
                className={`text-[9px] uppercase tracking-widest transition-colors ${isDark ? 'text-white/20 hover:text-white/50' : 'text-slate-300 hover:text-slate-500'}`}
              >
                Masquer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}