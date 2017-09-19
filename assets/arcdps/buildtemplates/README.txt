EFFORT IS MADE TO PREVENT CATASTROPHIC FAILURE LIKE ITEMS BEING EATEN,
HOWEVER, BY USING THIS EXTENSION YOU PROCEED ENTIRELY AT YOUR OWN RISK.
EXTENSIONS MUST BE UPDATED WITH ARCDPS.

install/usage:
save dll into bin64 folder.
alt-shift-d to bring up (or hide) templates window.
to use a different key, check example ini and create a line under [keys] for global_templates.
saving will take a snapshot of your current loadout for each selected category.
empty slots at time of save will not be replced at load (for partial templates).
loading can load one of each category - click to select, click again to deselect.
if no trait or skill templates selected, it will try to load the specified text codes.
right click on either text code to copy both to clipboard.
text codes will auto fill if valid code detected in clipboard.
text codes will auto fill if valid code detected in game text.
x to delete.

limitations:
no ranger pet swapping - verify done as part of the ui, and not on cmd send.
no rev legend swapping - much effort little reward.
no legendary stat/rune/infusion swapping - no legendaries to try on.

restrictions:
loading templates outside cities/hubs is limited to 500ms per command.
loading templates within a pvp match is disabled.
loading templates within wvw requires the determined or gliding enabled (mastery only) buffs

trait template code:
[*base64].
byte 0 = 't' (0x74).
byte 1 = u16 prof id.
byte 3-8 = u16[3] specialization line1, line2, line3.
byte 9-14 = u16[3] line1adept, line1master, line1grandmaster.
byte 15-20 = u16[3] line2adept, line2master, line2grandmaster.
byte 21-26 = u16[3] line3adept, line3master, line3grandmaster.

skill template code:
[*base64].
byte 0 = 's' (0x73).
byte 1 = u16 prof id.
byte 3-22 = u16[10] landheal, landutil1, landutil2, landutil3, landelite, waterheal, waterutil1, wateruril2, waterutil3, waterelite.
skillpaletteid's used for skill template are not currently available via web api.

gear template code:
too long to be feasible