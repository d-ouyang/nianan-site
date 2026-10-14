import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { AlertCircleIcon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import CurvedInput from '@/components/bits/CurvedInput';
import ShinyText from '@/components/bits/ShinyText';
import SwipeToast from '@/components/bits/SwipeToast';
import { isValidEmail } from '@/lib/email';
import { submitMoodNote } from '@/lib/moodNote';
import './MoodNote.css';

interface Notice {
  id: number;
  title: string;
  description: string;
  tone: 'ok' | 'warn';
  open: boolean;
}

/** 正值向下弯，负值向上弯。开心取负值，低落取正值。 */
const BEND = 96;

function moodWord(mood: number): string {
  if (mood <= -0.2) return 'Sad';
  if (mood >= 0.2) return 'Happy';
  return 'Neutral';
}

function mix(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

/** 低落是 x，平静是 —，开心是 ^。滑条在这三档之间连续变形。 */
function eyeStroke(mood: number, side: 0 | 1) {
  const s = 8;
  const sad: [number, number, number, number] = side === 0 ? [-s, -s, s, s] : [-s, s, s, -s];
  const mid: [number, number, number, number] = [-s, 0, s, 0];
  const happy: [number, number, number, number] = side === 0 ? [-s, 5, 0, -s] : [s, 5, 0, -s];
  const pick = (index: 0 | 1 | 2 | 3) =>
    mood <= 0 ? mix(sad[index], mid[index], mood + 1) : mix(mid[index], happy[index], mood);
  return { x1: pick(0), y1: pick(1), x2: pick(2), y2: pick(3) };
}

function MoodEye({ mood }: { mood: number }) {
  return (
    <svg viewBox="-14 -14 28 28" className="mood-eye size-11" aria-hidden="true">
      <line {...eyeStroke(mood, 0)} />
      <line {...eyeStroke(mood, 1)} />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="#F5C542" />
      <path
        d="M12 2.4v2.3M12 19.3v2.3M2.4 12h2.3M19.3 12h2.3M5.05 5.05l1.62 1.62M17.33 17.33l1.62 1.62M18.95 5.05l-1.62 1.62M6.67 17.33l-1.62 1.62"
        fill="none"
        stroke="#F5C542"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M7.2 15.2h9.2a3.2 3.2 0 0 0 .4-6.4 4.6 4.6 0 0 0-8.9-1.2 3.6 3.6 0 0 0-.7 7.6Z"
        fill="#4C8DFF"
        fillOpacity="0.28"
        stroke="#4C8DFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 17.6 7 20.2M12 17.6l-1.2 2.6M15.8 17.6 14.6 20.2"
        fill="none"
        stroke="#4C8DFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MoodNote() {
  const [mood, setMood] = useState(0);
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState<Notice | null>(null);

  const showNotice = (title: string, description: string, tone: Notice['tone']) => {
    setNotice({ id: Date.now(), title, description, tone, open: true });
  };

  const hideNotice = () => {
    setNotice((current) => (current?.open ? { ...current, open: false } : current));
  };

  const onSubmit = (value: string) => {
    const next = value.trim();
    if (!next) {
      showNotice('写一下邮箱', '留一个邮箱再发送。', 'warn');
      return;
    }
    if (!isValidEmail(next)) {
      showNotice('这个邮箱格式不对', '检查一下再发送。', 'warn');
      return;
    }
    const payload = { email: next, mood: Math.round(mood * 10) / 10 };
    void submitMoodNote(payload).then((result) => {
      if (result === 'ok') {
        showNotice('发送成功', '感谢您的信任，祝您生活愉快！', 'ok');
      } else if (result === 'duplicate') {
        showNotice('刚刚已经收到', '这个邮箱刚提交过，休息一下吧。', 'warn');
      } else if (result === 'rate-limited') {
        showNotice('稍微快了点', '操作太频繁啦，一分钟后再试。', 'warn');
      } else {
        showNotice('发送失败', '网络似乎不太顺畅，稍后再试。', 'warn');
      }
    });
  };

  return (
    <div className="mt-16">
      <ShinyText
        text="Are you happy today?"
        color="#9A9AA3"
        shineColor="#5CFFD0"
        speed={2.4}
        shineWidth={40}
        softness={0.8}
        glow={0.4}
        trigger="loop"
        className="text-hero leading-none font-medium tracking-tight"
      />
      <div className="mt-8 flex items-center gap-16 sm:gap-24">
        <div className="w-2/3 min-w-0">
          <div className="mb-8 flex justify-between px-8 sm:px-12">
            <MoodEye mood={mood} />
            <MoodEye mood={mood} />
          </div>
          <CurvedInput
            value={email}
            onChange={(value) => {
              setEmail(value);
              hideNotice();
            }}
            onSubmit={onSubmit}
            placeholder="you@email.com"
            buttonText="Send"
            ariaLabel="邮箱"
            type="email"
            name="email"
            theme="dark"
            bend={-mood * BEND}
            height={64}
            width="100%"
            backgroundColor="#121215"
            textColor="#ECECEE"
            placeholderColor="#9A9AA3"
            borderColor="#35353D"
            buttonColor="#00E0A4"
            buttonTextColor="#09090B"
            iconColor="#00E0A4"
            shadowColor="#000000"
          />
        </div>
        <div className="flex shrink-0 flex-col items-center gap-2">
          <SunIcon />
          <div className="mood-slider-slot">
            <input
              type="range"
              className="mood-slider"
              min={-1}
              max={1}
              step={0.05}
              value={mood}
              aria-label="Mood"
              aria-valuemin={-1}
              aria-valuemax={1}
              aria-valuenow={mood}
              aria-valuetext={moodWord(mood)}
              onChange={(event) => {
                setMood(Number(event.target.value));
                hideNotice();
              }}
            />
          </div>
          <RainIcon />
        </div>
      </div>
      {notice ? (
        <SwipeToast
          key={notice.id}
          className="mt-4"
          inline
          open={notice.open}
          title={notice.title}
          description={notice.description}
          icon={
            <HugeiconsIcon
              icon={notice.tone === 'ok' ? CheckmarkCircle02Icon : AlertCircleIcon}
              size={18}
              strokeWidth={1.75}
              color="#ECECEE"
            />
          }
          actionLabel="Get It"
          background="#35353D"
          color="#ECECEE"
          fuseColor="#00E0A4"
          onClose={() => {
            setNotice((current) => (current?.id === notice.id ? null : current));
          }}
        />
      ) : null}
    </div>
  );
}
