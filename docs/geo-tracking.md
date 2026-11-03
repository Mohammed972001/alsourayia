# AI answers: tracking (spec 001 T002, T039)

The prompts are in `scripts/geo-prompts.md`. The goal (SC) is for the shop to be named in at least 4 of the 20 answers
by week 8.

## Monthly routine

On the first working day of each month:

1. Ask the 20 prompts word for word in ChatGPT and Gemini, each in a new chat, with web search on.
2. Add one line per tool to the table below: answers naming the shop or the site, out of 20.
3. List any wrong fact (phone, address, hours, a product the shop does not sell) under «Wrong facts», then correct its
   source: `data/business.ts`, the Business Profile or the listing it came from.
4. Add the visits and contacts from AI tools in GA4 (source `chatgpt.com`, `gemini.google.com`, `perplexity.ai`,
   `claude.ai`, property 559193509, host www.mokeet-elsuarye.com).

## Results

Prompts 19 and 20 contain the shop's name, so they test whether the facts are right, not whether the shop gets
recommended. Read «not naming the shop» as the real measure.

| Date | Tool | Search on? | Named, prompts 1–18 | Named, prompts 19–20 | Notes |
|---|---|---|---|---|---|
| 2026-11-02 | Gemini flash-lite | No (search quota used up) | 0 of 17 | Text repeats the name; facts not checked | Prompt 7 timed out. Without search this shows what the model remembers, so it is not the real baseline. |
| 2026-11-03 | ChatGPT, logged out, search on | Yes | 3 of 8 | Facts all correct | Details below. The other prompts roll through the weekly test. |
| 2026-11-02 | Perplexity | Yes | 0 of 1 | Not asked | Led with alsourayia.com and quoted its published price |
| | Gemini with search | | | | First run is still needed, by hand |

## ChatGPT answers, 2026-11-02

| Question | Named? | Place | Who came first or instead |
|---|---|---|---|
| باركيه ارضيات مع التركيب في الرياض | Yes, with address, WhatsApp and link | 5th | Four shops from Google Maps with ratings |
| ارضيات ربل للجيم في الرياض | Yes, with address, phone, link and map | 2nd | Profit Sports (Maps) |
| موكيت مساجد في حراج بن قاسم | Yes, with phone and link | 2nd | مفروشات موكيت السريع للسجاد, another shop, rated 4.9 on Maps |
| فينيل طبي لعيادة في الرياض | No | | alsourayi-intl.com, moket-elsuarye.com, lamsatselen.com.sa, vfloorsa.com, tiraznajd.com |
| موكيت ومفروشات السريع | Yes, all facts correct | 1st | |
| موكيت مكاتب في الرياض | No | | Rukn Al-Asfour, Tiraz Najd, then مفروشات موكيت السريع (another shop, moket-elsuarye.com) |
| وين ألقى محل موكيت في الرياض | No | | Five shops from Google Maps |
| موكيت تركي مشجر في الرياض | No | | مفروشات موكيت السريع للسجاد (another shop, 0546465316) came first |
| باركيه ضد الماء في الرياض | No | | Al-Ghomlas, Aljawdah, Nobles, Wood Line |

What this shows:

- Shops with a Google Maps listing and ratings lead the list. This site has none yet, so the Business Profile is the next big step (SITE-LESSONS G2).
- Answers on medical vinyl mention homogeneous vinyl, heat welding and coved skirting. Add those to the page only if the owner confirms the shop does them.
- A shop with a very similar name, مفروشات موكيت السريع للسجاد (0546465316, 4.9 on Maps), and the look-alike domain moket-elsuarye.com appear on carpet questions. They are not this client. Always check the phone and link before counting a mention.
- Perplexity quoted a competitor's published price per metre, as SITE-LESSONS G3 predicts.

## Visits from AI tools

| Period | Source | Sessions | Contact taps |
|---|---|---|---|
| 2026-08-01 to 2026-11-02 | chatgpt.com | 7 | 4 |

## Wrong facts

None logged yet.
