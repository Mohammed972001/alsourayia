"use client";

import Link from "next/link";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

export type RoomFloorItem = { slug: string; name: string; price: number | null; tex: string; size: number; current: boolean };

/**
 * «شوفها في المكان» (round 3, from the picker's hero «أ الأوضة بتتفرش»): an AI drawing of an empty room whose
 * floor is laid with this product when the room comes on screen, then with any floor the visitor taps. The floor
 * is a plane turned flat (rotateX 90deg) under a perspective whose origin is the room's vanishing point, clipped
 * to the floor polygon and lit by a soft-light map of the original concrete floor (styles/r3-product.css).
 * Each change remounts the top plane so its «laying» animation runs again.
 */
export function RoomFloor({ floors, room }: { floors: RoomFloorItem[]; room: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(-1);
  const [prev, setPrev] = useState(-1);
  const [stamp, setStamp] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          setOn((v) => (v < 0 ? 0 : v));
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = (k: number) => {
    if (k === on) return;
    setPrev(on);
    setOn(k);
    setStamp((s) => s + 1);
  };

  const plane = (i: number, cls: string, key: string) => (
    <div key={key} className={`room__plane ${cls}`} style={{ "--t": `url(${floors[i].tex})`, "--s": `${floors[i].size}cqw` } as CSSProperties} />
  );
  const active = floors[Math.max(on, 0)];

  return (
    <div className="room" ref={box}>
      <div className="room__scene">
        {room}
        <div className="room__floor" aria-hidden="true">
          {prev >= 0 && plane(prev, "is-prev", `p-${stamp}`)}
          {on >= 0 && plane(on, "is-on", `o-${stamp}`)}
          {/* eslint-disable-next-line @next/next/no-img-element -- static texture map, not a photo */}
          <img className="room__light" src="/textures/room-light.webp" alt="" width={1600} height={1067} loading="lazy" />
        </div>
        <p className={`room__tag${on >= 0 ? " is-in" : ""}`} key={`t-${stamp}`} aria-live="polite">
          <b>{active.name}</b>
          <span>{active.price !== null ? `من ${active.price} ريال/م²` : "السعر بعد القياس"}</span>
          {!active.current && on >= 0 && (
            <Link href={`/products/${active.slug}`} className="room__go">
              صفحته
            </Link>
          )}
        </p>
        <span className="room__note">رسمة توضيحية</span>
      </div>
      <div className="room__chips" role="group" aria-label="جرّب أرضية في الغرفة">
        {floors.map((f, i) => (
          <button key={f.slug} type="button" className="room__chip" aria-pressed={i === on} onClick={() => show(i)}>
            <i style={{ "--t": `url(${f.tex})` } as CSSProperties} aria-hidden="true" />
            <span>
              {f.name}
              {f.current && <small>هذا الصنف</small>}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
