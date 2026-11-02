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
| | ChatGPT | | | | First run is still needed, by hand |
| | Gemini with search | | | | First run is still needed, by hand |

## Visits from AI tools

| Period | Source | Sessions | Contact taps |
|---|---|---|---|
| 2026-08-01 to 2026-11-02 | chatgpt.com | 7 | 4 |

## Wrong facts

None logged yet.
