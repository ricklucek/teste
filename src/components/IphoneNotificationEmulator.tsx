"use client"

import { useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Users, Flame, Music2, Sparkles } from "lucide-react";

const GROUPS = [
  "República 22 🔥",
  "Turma do Fundão",
  "Umuarama Updates",
  "Só Vai Quem Aguenta",
  "Grupo dos Perdidos",
  "Facul + Rolê",
  "Pré Férias 2026",
  "Os Últimos do Semestre",
  "WhatsApp",
  "Direct",
  "Telegram"
];

const PEOPLE = [
  "Lari", "Gabi", "Rafa", "Bia", "Nanda", "Gui", "Duda", "Malu", "Cami", "João", "Vini", "Thais", "Caio", "Luiza", "Pedro"
];

const COMMENTS = [
  "GENTE",
  "Vocês viram oq ta chegando em Umuarama?",
  "Parece uma festa insana!!!",
  "ANTES DAS FÉRIAASSS",
  "Não vou perder essa festa por nada!",
  "Vocês vão comigo!!",
  "Tudo o que não fiz esse semestre vou fazer",
  "Ai meu Deus 🔥🔥🔥",
  "Isso vai virar assunto na cidade inteira",
  "Já estou separando look, sério",
  "Não tem condição de perder essa",
  "Se for do jeito que falaram, acabou pra todo mundo",
  "Umuarama não tá pronta pra isso",
  "Alguém sabe onde compra ingresso???",
  "MANO, olha isso aqui",
  "O semestre acaba, mas a história começa lá",
  "Vai ser caótico, eu senti",
  "Chamando todo mundo AGORA",
  "Essa festa vai salvar minhas férias",
  "Eu preciso estar nesse rolê",
  "Não vou responder por mim depois disso",
  "Só digo uma coisa: fomos avisados",
  "Tá todo mundo falando disso já",
  "Se vocês não forem, eu vou sozinha mesmo",
  "É o evento canônico antes das férias",
  "Eu não tô preparada mas eu vou"
];

const ICONS = [MessageCircle, Users, Flame, Music2, Sparkles];

function pick<T,>(arr: T[], index: number, salt = 0): T {
  return arr[(index * 7 + salt * 13) % arr.length];
}

function generateNotifications() {
  const schedule = [
    // começo lento: sensação natural de notificações chegando uma por vez
    0.8, 2.8, 4.9, 6.8,
    // começa a esquentar
    8.2, 9.2, 10.1, 10.85, 11.45, 12.0,
    // pré-caos: a pilha já começa a correr
    12.45, 12.85, 13.2, 13.5, 13.78, 14.02,
    // caos: notificações sobem rapidamente, como spam descontrolado
    14.22, 14.38, 14.54, 14.69, 14.84, 14.98, 15.12, 15.25,
    15.38, 15.5, 15.62, 15.74, 15.86, 15.98, 16.1, 16.22,
    16.34, 16.46, 16.58, 16.7, 16.82, 16.94, 17.06, 17.18,
    17.3, 17.42, 17.54, 17.66, 17.78, 17.9, 18.02, 18.14,
    18.26, 18.38, 18.5, 18.62, 18.74, 18.86, 18.98, 19.1
  ];

  return schedule.map((delay, index) => {
    const Icon = pick(ICONS, index, 2);
    const chaotic = delay >= 14.2;
    const preChaos = delay >= 12.45 && delay < 14.2;

    return {
      id: index,
      delay,
      chaotic,
      preChaos,
      group: pick(GROUPS, index, 1),
      person: pick(PEOPLE, index, 2),
      text: pick(COMMENTS, index, 3),
      Icon,
      drift: chaotic ? -10 + ((index * 9) % 21) : -4 + ((index * 5) % 9),
      rotate: chaotic ? -4 + ((index * 3) % 9) : -1.2 + ((index * 0.8) % 2.4),
      scale: chaotic ? 0.96 : 1,
      z: 200 - index,
    };
  });
}

function NotificationCard({ item }: { item: ReturnType<typeof generateNotifications>[number] }) {
  const Icon = item.Icon;

  const lifetime = item.chaotic ? 4 : item.preChaos ? 7 : 9;
  const pushDistance = item.chaotic ? -250 : item.preChaos ? -300 : -500;
  const exitDistance = item.chaotic ? -100 : item.preChaos ? -50 : -10;

  return (
    <motion.div
      className="absolute left-[350px] bottom-[150px] w-[80%] max-w-[90vw] -translate-x-1/2 rounded-[28px] border border-white/20 bg-white/12 p-3 shadow-2xl backdrop-blur-2xl"
      style={{
        zIndex: item.z,
        boxShadow:
          "0 0 38px rgba(255,255,255,0.17), 0 20px 55px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.24)",
      }}
      initial={{
        opacity: 0,
        x: "-50%",
        y: 0,
        scale: 0.72,
        rotate: item.rotate,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: [0, 1, 1, 1, 0],
        x: ["-50%", `calc(-50% + ${item.drift}px)`, `calc(-50% + ${item.drift}px)`, `calc(-50% + ${item.drift * 1.6}px)`, `calc(-50% + ${item.drift * 2}px)`],
        y: [-92, 0, pushDistance, pushDistance - 50, exitDistance],
        scale: [0.72, item.scale + 0.055, item.scale, item.scale * 0.985, item.scale * 0.94],
        rotate: [item.rotate, item.rotate * -0.45, item.rotate, item.rotate * 1.15, item.rotate * 1.3],
        filter: ["blur(14px)", "blur(0px)", "blur(0px)", "blur(1px)", "blur(9px)"],
      }}
      transition={{
        delay: item.delay,
        duration: lifetime,
        ease: [0.18, 0.92, 0.18, 1],
        times: [0, 0.16, 0.58, 0.78, 1],
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-400/30">
          <Icon className="h-6 w-6 text-white" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="truncate text-[13px] font-semibold tracking-tight text-white/95">
              {item.group}
            </div>
            <div className="shrink-0 text-[12px] font-medium text-white/60">agora</div>
          </div>

          <div className="mt-0.5 truncate text-[13px] font-semibold text-white/80">
            {item.person}
          </div>

          <div className="mt-1 text-[15px] font-semibold leading-snug text-white drop-shadow">
            {item.text}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function IphoneNotificationEmulator() {
  const notifications = useMemo(() => generateNotifications(), []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#050509] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(80,80,105,0.22),rgba(5,5,9,0.96)_48%,#030306_100%)]" />
      <div className="absolute inset-0 bg-black/45" />

      <motion.div
        className="absolute inset-0 z-[5] bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.06),transparent_42%)]"
        animate={{ opacity: [0.25, 0.58, 0.25] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[100vh] overflow-visible">
        {notifications.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[999] bg-[#050509]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ delay: 20.4, duration: 1.3, times: [0, 0.2, 1], ease: "easeInOut" }}
      />
    </main>
  );
}
