/* inc_lang.h */

enum m_translate {
	/* program */
	LANG_CORE = 1,

	/* common: professions */
	LANG_COMMON_PROF = 100,
	LANG_COMMON_PROF_GUARDIAN,
	LANG_COMMON_PROF_DRAGONHUNTER,
	LANG_COMMON_PROF_WARRIOR,
	LANG_COMMON_PROF_BERSERKER,
	LANG_COMMON_PROF_ENGINEER,
	LANG_COMMON_PROF_SCRAPPER,
	LANG_COMMON_PROF_RANGER,
	LANG_COMMON_PROF_DRUID,
	LANG_COMMON_PROF_THIEF,
	LANG_COMMON_PROF_DAREDEVIL,
	LANG_COMMON_PROF_ELEMENTALIST,
	LANG_COMMON_PROF_TEMPEST,
	LANG_COMMON_PROF_MESMER,
	LANG_COMMON_PROF_CHRONOMANCER,
	LANG_COMMON_PROF_NECROMANCER,
	LANG_COMMON_PROF_REAPER,
	LANG_COMMON_PROF_RECKONER,
	LANG_COMMON_PROF_HERALD,
	LANG_COMMON_PROF_FIREBRAND,
	LANG_COMMON_PROF_SPELLBREAKER,
	LANG_COMMON_PROF_HOLOSMITH,
	LANG_COMMON_PROF_SOULBEAST,
	LANG_COMMON_PROF_DEADEYE,
	LANG_COMMON_PROF_WEAVER,
	LANG_COMMON_PROF_MIRAGE,
	LANG_COMMON_PROF_SCOURGE,
	LANG_COMMON_PROF_RENEGADE,

	/* common: skill itemization */
	LANG_COMMON_SKILLS_TOTAL = 130,
	LANG_COMMON_SKILLS_H,
	LANG_COMMON_SKILLS_F,
	LANG_COMMON_SKILLS_ACTIVATIONS,
	LANG_COMMON_SKILLS_CANCELS,
	LANG_COMMON_SKILLS_WASTED,
	LANG_COMMON_SKILLS_HITSCOMPRESS,
	LANG_COMMON_SKILLS_HITSTOTAL,
	LANG_COMMON_SKILLS_NINETY,
	LANG_COMMON_SKILLS_FIFTY,
	LANG_COMMON_SKILLS_MOVING,
	LANG_COMMON_SKILLS_FLANKING,
	LANG_COMMON_SKILLS_CRITS,
	LANG_COMMON_SKILLS_VALUE,
	LANG_COMMON_SKILLS_MIN,
	LANG_COMMON_SKILLS_AVG,
	LANG_COMMON_SKILLS_MAX,
	LANG_COMMON_SKILLS_APXDMG,
	LANG_COMMON_SKILLS_OVERSTACK,
	LANG_COMMON_SKILLS_NOSKILLS,
	LANG_COMMON_SKILLS_REMOVED,
	LANG_COMMON_SKILLS_RESISTED,
	LANG_COMMON_SKILLS_GLANCE,
	LANG_COMMON_SKILLS_MISS,
	LANG_COMMON_SKILLS_NOTARGETS,

	/* common: generic */
	LANG_COMMON_ATT_HEADER = 155,
	LANG_COMMON_ATT_HOSTILE,
	LANG_COMMON_ATT_FRIENDLY,
	LANG_COMMON_DATATYPE_HEADER = 160,
	LANG_COMMON_DATATYPE_COMBAT,
	LANG_COMMON_DATATYPE_ACTIVE,
	LANG_COMMON_DIRECTION_HEADER = 165,
	LANG_COMMON_DIRECTION_OUTGOING,
	LANG_COMMON_DIRECTION_INCOMING,
	LANG_COMMON_DATASTYLE_HEADER = 170,
	LANG_COMMON_DATASTYLE_PERSECOND,
	LANG_COMMON_DATASTYLE_TOTAL,
	LANG_COMMON_DATASTYLE_PERCENT,
	
	/* panels: dps */
	LANG_PAN_PERSONALDPS_HEADER = 200,
	LANG_PAN_PERSONALDPS_OUT,
	LANG_PAN_PERSONALDPS_IN,
	LANG_PAN_PERSONALDPS_CBT,
	LANG_PAN_PERSONALDPS_ACT,
	LANG_PAN_PERSONALDPS_DAMAGE,
	LANG_PAN_PERSONALDPS_PHYS,
	LANG_PAN_PERSONALDPS_BUFF,
	LANG_PAN_PERSONALDPS_HEALING,
	LANG_PAN_PERSONALDPS_CRIT,
	LANG_PAN_PERSONALDPS_NINETY,
	LANG_PAN_PERSONALDPS_FIFTY,
	LANG_PAN_PERSONALDPS_EVADE,
	LANG_PAN_PERSONALDPS_BLOCK,
	LANG_PAN_PERSONALDPS_ABSORB,
	LANG_PAN_PERSONALDPS_INTERRUPT,
	LANG_PAN_PERSONALDPS_CURRENT,
	LANG_PAN_PERSONALDPS_HIST,
	LANG_PAN_PERSONALDPS_COMBAT,
	LANG_PAN_PERSONALDPS_PS,
	LANG_PAN_PERSONALDPS_DMG,
	LANG_PAN_PERSONALDPS_PERSONAL,
	LANG_PAN_PERSONALDPS_INTERVAL,
	LANG_PAN_PERSONALDPS_MILLISECONDS,
	LANG_PAN_PERSONALDPS_HISTLEFT,
	LANG_PAN_PERSONALDPS_HISTRIGHT,
	LANG_PAN_PERSONALDPS_SHIELDS,

	/* panels: skills */
	LANG_PAN_PERSONALSKILLS_HEADER = 240,
	LANG_PAN_PERSONALSKILLS_OUT,
	LANG_PAN_PERSONALSKILLS_IN,
	LANG_PAN_PERSONALSKILLS_ALL,
	LANG_PAN_PERSONALSKILLS_BUFFS,
	LANG_PAN_PERSONALSKILLS_PHYS,
	LANG_PAN_PERSONALSKILLS_SKREMOVE,
	LANG_PAN_PERSONALSKILLS_CURRENT,
	LANG_PAN_PERSONALSKILLS_HIST,
	LANG_PAN_PERSONALSKILLS_COMBAT,
	LANG_PAN_PERSONALSKILLS_PERSONAL,
	LANG_PAN_PERSONALSKILLS_INTERVAL,
	LANG_PAN_PERSONALSKILLS_MILLISECONDS,
	LANG_PAN_PERSONALSKILLS_HEADERSHORT,

	/* panels: target */
	LANG_PAN_TARGET_HEADER = 270,
	LANG_PAN_TARGET_LOGAUTO,
	LANG_PAN_TARGET_LOGMANUAL,
	LANG_PAN_TARGET_LOGNONE,
	LANG_PAN_TARGET_LOGUNAVAILABLE,
	LANG_PAN_TARGET_NOLOCK,
	LANG_PAN_TARGET_COMBAT,
	LANG_PAN_TARGET_RS,
	LANG_PAN_TARGET_DPS,
	LANG_PAN_TARGET_TTK,
	LANG_PAN_TARGET_START,
	LANG_PAN_TARGET_STOP,

	/* panels: healthbar */
	LANG_PAN_HEALTHBAR_HEADER = 290,
	LANG_PAN_HEALTHBAR_HP,

	/* panels: chcli */
	LANG_PAN_CHCLI_HEADER = 300,
	LANG_PAN_CHCLI_OUT,
	LANG_PAN_CHCLI_IN,
	LANG_PAN_CHCLI_ADPS,
	LANG_PAN_CHCLI_BUFFS,
	LANG_PAN_CHCLI_PHYS,
	LANG_PAN_CHCLI_CND,
	LANG_PAN_CHCLI_TOTAL,
	LANG_PAN_CHCLI_H,
	LANG_PAN_CHCLI_F,
	LANG_PAN_CHCLI_COMBAT,
	LANG_PAN_CHCLI_PS,
	LANG_PAN_CHCLI_DMG,
	LANG_PAN_CHCLI_DISABLED,
	LANG_PAN_CHCLI_SKREMOVE,
	LANG_PAN_CHCLI_CURRENT,
	LANG_PAN_CHCLI_HIST,
	LANG_PAN_CHCLI_AGREMOVE,
	LANG_PAN_CHCLI_CHCLI,
	LANG_PAN_CHCLI_INTERVAL,
	LANG_PAN_CHCLI_MILLISECONDS,
	LANG_PAN_CHCLI_PCT,
	LANG_PAN_CHCLI_NOPLAYERS,
	LANG_PAN_CHCLI_HISTLEFT,
	LANG_PAN_CHCLI_HISTRIGHT,

	/* panels: summary */
	LANG_PAN_SUMMARY_HEADER = 340,
	LANG_PAN_SUMMARY_CBTTIME,
	LANG_PAN_SUMMARY_ADPSOUT,
	LANG_PAN_SUMMARY_TGADPSOUT,
	LANG_PAN_SUMMARY_ADPSIN,
	LANG_PAN_SUMMARY_TGADPSIN,
	LANG_PAN_SUMMARY_CRIT,
	LANG_PAN_SUMMARY_NINETY,
	LANG_PAN_SUMMARY_FIFTY,
	LANG_PAN_SUMMARY_MOVING,
	LANG_PAN_SUMMARY_FLANK,
	LANG_PAN_SUMMARY_CANCELTIME,
	LANG_PAN_SUMMARY_RESCOUNT,
	LANG_PAN_SUMMARY_RESTIME,
	LANG_PAN_SUMMARY_DOWNCOUNT,
	LANG_PAN_SUMMARY_CLEANSEDOUT,
	LANG_PAN_SUMMARY_STRIPPEDOUT,
	LANG_PAN_SUMMARY_GLANCE,
	LANG_PAN_SUMMARY_EVADES,
	LANG_PAN_SUMMARY_INTERRUPTS,
	LANG_PAN_SUMMARY_MISSED,
	LANG_PAN_SUMMARY_DODGE,
	LANG_PAN_SUMMARY_HIST,
	LANG_PAN_SUMMARY_SQSHORT1,
	LANG_PAN_SUMMARY_SQSHORT2,
	LANG_PAN_SUMMARY_CLEANSEDIN,
	LANG_PAN_SUMMARY_STRIPPEDIN,
	LANG_PAN_SUMMARY_DOWNTIME,
	LANG_PAN_SUMMARY_CANCELCOUNT,
	LANG_PAN_SUMMARY_SHIELD,

	/* panels: logger */
	LANG_PAN_LOGGER_HEADER = 390,
	LANG_PAN_LOGGER_CBT,
	LANG_PAN_LOGGER_ENG,
	LANG_PAN_LOGGER_GME,
	LANG_PAN_LOGGER_BOT,
	LANG_PAN_LOGGER_TOP,
	LANG_PAN_LOGGER_AUTO,
	LANG_PAN_LOGGER_SCROLL,
	LANG_PAN_LOGGER_FILTER,
	LANG_PAN_LOGGER_RESQ,
	LANG_PAN_LOGGER_CBTQ,
	LANG_PAN_LOGGER_MBLK,
	LANG_PAN_LOGGER_MSZ,
	LANG_PAN_LOGGER_AG,
	LANG_PAN_LOGGER_CH,
	LANG_PAN_LOGGER_CEA,
	LANG_PAN_LOGGER_GRC,
	LANG_PAN_LOGGER_CBS,
	LANG_PAN_LOGGER_CCX,
	LANG_PAN_LOGGER_TGC,
	LANG_PAN_LOGGER_SCR,
	LANG_PAN_LOGGER_RTH,
	LANG_PAN_LOGGER_CCS,
	LANG_PAN_LOGGER_BCX,
	LANG_PAN_LOGGER_GPT,
	LANG_PAN_LOGGER_RND,
	LANG_PAN_LOGGER_REF,
	LANG_PAN_LOGGER_LOGGER,
	LANG_PAN_LOGGER_CHANNEL,
	LANG_PAN_LOGGER_SIM,
	LANG_PAN_LOGGER_MCI,
	LANG_PAN_LOGGER_MCO,

	/* panels: compass */
	LANG_PAN_COMPASS_HEADER = 440,
	LANG_PAN_COMPASS_N,
	LANG_PAN_COMPASS_E,
	LANG_PAN_COMPASS_S,
	LANG_PAN_COMPASS_W,
	LANG_PAN_COMPASS_BEARING,

	/* panels: metrics */
	LANG_PAN_METRICS_HEADER = 450,
	LANG_PAN_METRICS_FPS,
	LANG_PAN_METRICS_PING,
	LANG_PAN_METRICS_MAPTYPE,
	LANG_PAN_METRICS_MAPID,
	LANG_PAN_METRICS_MAPLV,
	LANG_PAN_METRICS_BUILDGW,
	LANG_PAN_METRICS_BUILDARC,
	LANG_PAN_METRICS_TICK,

	/* panels: gathering */
	LANG_PAN_GATHER_HEADER = 460,
	LANG_PAN_GATHER_PICKH,
	LANG_PAN_GATHER_AXEH,
	LANG_PAN_GATHER_SICKLEH,
	LANG_PAN_GATHER_PICKED,
	LANG_PAN_GATHER_AXED,
	LANG_PAN_GATHER_SICKLED,
	LANG_PAN_GATHER_TOOLS,
	LANG_PAN_GATHER_PICKREMAIN,
	LANG_PAN_GATHER_AXEREMAIN,
	LANG_PAN_GATHER_SICKLEREMAIN,
	LANG_PAN_GATHER_TIME,

	/* panels: options */
	LANG_PAN_OPTIONS_HEADER = 490,
	LANG_PAN_OPTIONS_PANELS,
	LANG_PAN_OPTIONS_SUMMARIES,
	LANG_PAN_OPTIONS_BASIC,
	LANG_PAN_OPTIONS_Y,
	LANG_PAN_OPTIONS_N,
	LANG_PAN_OPTIONS_SM_LINK,
	LANG_PAN_OPTIONS_SM_AUTOOPEN,
	LANG_PAN_OPTIONS_SM_ADPSOUT,
	LANG_PAN_OPTIONS_SM_ADPSIN,
	LANG_PAN_OPTIONS_SM_BUFFS,
	LANG_PAN_OPTIONS_SM_RATES,
	LANG_PAN_OPTIONS_SM_AGSTATES,
	LANG_PAN_OPTIONS_SM_BUFFEVENTS,
	LANG_PAN_OPTIONS_SM_RESULTS,
	LANG_PAN_OPTIONS_BS_LOCKTARGET,
	LANG_PAN_OPTIONS_BS_SAVELOGS,
	LANG_PAN_OPTIONS_BS_NPCINPATH,
	LANG_PAN_OPTIONS_BS_COMPRESS,
	LANG_PAN_OPTIONS_BS_PANSNAP,
	LANG_PAN_OPTIONS_BS_ALWAYSREQMOD,
	LANG_PAN_OPTIONS_BS_COMBATDETAIL,
	LANG_PAN_OPTIONS_BS_VERBOSITY,
	LANG_PAN_OPTIONS_RESTRICTED,
	LANG_PAN_OPTIONS_RS_HBARS,
	LANG_PAN_OPTIONS_RS_EMBEDLL,
	LANG_PAN_OPTIONS_RS_FLASHWHISPER,
	LANG_PAN_OPTIONS_RS_FLASHPARTY,
	LANG_PAN_OPTIONS_RS_RWACCEPT,
	LANG_PAN_OPTIONS_RS_CONSUMEMAX,
	LANG_PAN_OPTIONS_RS_CONSUMESKIPDELAY,
	LANG_PAN_OPTIONS_RS_KEYS,
	LANG_PAN_OPTIONS_BS_GUILDINPATH,
	LANG_PAN_OPTIONS_BS_BGBARS,
	LANG_PAN_OPTIONS_BS_FWDINPUT,
	LANG_PAN_OPTIONS_BS_TRANSPARENCY,
	LANG_PAN_OPTIONS_BS_BGBARCOLOUR,
	LANG_PAN_OPTIONS_BS_PLAYERINPATH,
	LANG_PAN_OPTIONS_BS_ALTERNATEUI,
	LANG_PAN_OPTIONS_BS_RECOUNTLIKE,
	LANG_PAN_OPTIONS_BS_ALTUITRIM,
	LANG_PAN_OPTIONS_BS_ALTUIMOVELOCK,
	LANG_PAN_OPTIONS_BS_MENULOCK,
	LANG_PAN_OPTIONS_BS_NOTOTALS,
	LANG_PAN_OPTIONS_BS_ALTUICLICKLOCK,
	LANG_PAN_OPTIONS_RS_EMBEDEXTRA,
	LANG_PAN_OPTIONS_LOGGING,
	LANG_PAN_OPTIONS_SM_HIDEZEROBUFFS,

	/* panels: templates */
	LANG_PAN_TEMPLATES_HEADER = 570,
	LANG_PAN_TEMPLATES_LOAD,
	LANG_PAN_TEMPLATES_SAVE,
	LANG_PAN_TEMPLATES_NONE,
	LANG_PAN_TEMPLATES_TRAITS,
	LANG_PAN_TEMPLATES_GEAR,
	LANG_PAN_TEMPLATES_SKILLS,
	LANG_PAN_TEMPLATES_LEGENDARY,
	LANG_PAN_TEMPLATES_PVP,
	LANG_PAN_TEMPLATES_SAVETRAITS,
	LANG_PAN_TEMPLATES_SAVEGEAR,
	LANG_PAN_TEMPLATES_COPY,
	LANG_PAN_TEMPLATES_NAME,
	LANG_PAN_TEMPLATES_DELETE,
	LANG_PAN_TEMPLATES_OVERWRITE,
	LANG_PAN_TEMPLATES_SAVED,
	LANG_PAN_TEMPLATES_LOADING,
	LANG_PAN_TEMPLATES_REDUCEDRATE,
	LANG_PAN_TEMPLATES_DISABLED,
	LANG_PAN_TEMPLATES_CANCEL,

	/* panels: buffs */
	LANG_PAN_BUFFS_HEADER = 590,
	LANG_PAN_BUFFS_WARNING,

	/* panels: details */
	LANG_PAN_DETAIL_HEADER = 610,
	LANG_PAN_DETAIL_MIN,
	LANG_PAN_DETAIL_MAX,
	LANG_PAN_DETAIL_ELAPSED,

	/* common: custom */
	LANG_COMMON_CSK_DODGE = 620,
	LANG_COMMON_CSK_SHIELD,

	/* common: skills2 */
	LANG_COMMON_SKILLS2_NOINCOMINGDMG = 630,
	LANG_COMMON_SKILLS2_SHIELD,
	LANG_COMMON_SKILLS2_HITSANY,

	/* end */
	LANG_END
};

							
							export { m_translate };
							
							let lang = {};
							
								/* core */
	lang[m_translate.LANG_CORE] = "core";

	/* common: professions */
	lang[m_translate.LANG_COMMON_PROF_GUARDIAN] = "Gdn";
	lang[m_translate.LANG_COMMON_PROF_DRAGONHUNTER] = "Dgh";
	lang[m_translate.LANG_COMMON_PROF_WARRIOR] = "War";
	lang[m_translate.LANG_COMMON_PROF_BERSERKER] = "Brs";
	lang[m_translate.LANG_COMMON_PROF_ENGINEER] = "Eng";
	lang[m_translate.LANG_COMMON_PROF_SCRAPPER] = "Scr";
	lang[m_translate.LANG_COMMON_PROF_RANGER] = "Rgr";
	lang[m_translate.LANG_COMMON_PROF_DRUID] = "Dru";
	lang[m_translate.LANG_COMMON_PROF_THIEF] = "Thf";
	lang[m_translate.LANG_COMMON_PROF_DAREDEVIL] = "Dar";
	lang[m_translate.LANG_COMMON_PROF_ELEMENTALIST] = "Ele";
	lang[m_translate.LANG_COMMON_PROF_TEMPEST] = "Tmp";
	lang[m_translate.LANG_COMMON_PROF_MESMER] = "Mes";
	lang[m_translate.LANG_COMMON_PROF_CHRONOMANCER] = "Chr";
	lang[m_translate.LANG_COMMON_PROF_NECROMANCER] = "Nec";
	lang[m_translate.LANG_COMMON_PROF_REAPER] = "Rea";
	lang[m_translate.LANG_COMMON_PROF_RECKONER] = "Rev";
	lang[m_translate.LANG_COMMON_PROF_HERALD] = "Her";
	lang[m_translate.LANG_COMMON_PROF_FIREBRAND] = "Fbd";
	lang[m_translate.LANG_COMMON_PROF_SPELLBREAKER] = "Spb";
	lang[m_translate.LANG_COMMON_PROF_HOLOSMITH] = "Hls";
	lang[m_translate.LANG_COMMON_PROF_SOULBEAST] = "Slb";
	lang[m_translate.LANG_COMMON_PROF_DEADEYE] = "Ded";
	lang[m_translate.LANG_COMMON_PROF_WEAVER] = "Wea";
	lang[m_translate.LANG_COMMON_PROF_MIRAGE] = "Mir";
	lang[m_translate.LANG_COMMON_PROF_SCOURGE] = "Scg";
	lang[m_translate.LANG_COMMON_PROF_RENEGADE] = "Ren";

	/* common: skill itemization */
	lang[m_translate.LANG_COMMON_SKILLS_TOTAL] = "TOTAL";
	lang[m_translate.LANG_COMMON_SKILLS_H] = "H";
	lang[m_translate.LANG_COMMON_SKILLS_F] = "F";
	lang[m_translate.LANG_COMMON_SKILLS_ACTIVATIONS] = "activations";
	lang[m_translate.LANG_COMMON_SKILLS_CANCELS] = "cancels";
	lang[m_translate.LANG_COMMON_SKILLS_WASTED] = "time wasted";
	lang[m_translate.LANG_COMMON_SKILLS_HITSCOMPRESS] = "hits (cmprs)";
	lang[m_translate.LANG_COMMON_SKILLS_HITSTOTAL] = "hits (dmg)";
	lang[m_translate.LANG_COMMON_SKILLS_NINETY] = "over 90";
	lang[m_translate.LANG_COMMON_SKILLS_FIFTY] = "under 50";
	lang[m_translate.LANG_COMMON_SKILLS_MOVING] = "moving";
	lang[m_translate.LANG_COMMON_SKILLS_FLANKING] = "flanking";
	lang[m_translate.LANG_COMMON_SKILLS_CRITS] = "crit";
	lang[m_translate.LANG_COMMON_SKILLS_VALUE] = "total";
	lang[m_translate.LANG_COMMON_SKILLS_MIN] = "min";
	lang[m_translate.LANG_COMMON_SKILLS_AVG] = "avg";
	lang[m_translate.LANG_COMMON_SKILLS_MAX] = "max";
	lang[m_translate.LANG_COMMON_SKILLS_APXDMG] = "apx dmg";
	lang[m_translate.LANG_COMMON_SKILLS_OVERSTACK] = "overstack";
	lang[m_translate.LANG_COMMON_SKILLS_NOSKILLS] = "NO SKILLS LOGGED";
	lang[m_translate.LANG_COMMON_SKILLS_REMOVED] = "removed";
	lang[m_translate.LANG_COMMON_SKILLS_RESISTED] = "resisted";
	lang[m_translate.LANG_COMMON_SKILLS_GLANCE] = "glance";
	lang[m_translate.LANG_COMMON_SKILLS_MISS] = "miss";
	lang[m_translate.LANG_COMMON_SKILLS_NOTARGETS] = "NO TARGETS LOGGED";

	/* common: skills 2 */
	lang[m_translate.LANG_COMMON_SKILLS2_NOINCOMINGDMG] = "NO INCOMING DAMAGE";
	lang[m_translate.LANG_COMMON_SKILLS2_SHIELD] = "shielded";
	lang[m_translate.LANG_COMMON_SKILLS2_HITSANY] = "hits (all)";

	/* common: custom skills */
	lang[m_translate.LANG_COMMON_CSK_DODGE] = "Dodge";
	lang[m_translate.LANG_COMMON_CSK_SHIELD] = "Barrier";

	/* common: direction */
	lang[m_translate.LANG_COMMON_ATT_HEADER] = "ATTITUDE";
	lang[m_translate.LANG_COMMON_ATT_HOSTILE] = "HOSTILE";
	lang[m_translate.LANG_COMMON_ATT_FRIENDLY] = "FRIENDLY";
	lang[m_translate.LANG_COMMON_DATATYPE_HEADER] = "TYPE";
	lang[m_translate.LANG_COMMON_DATATYPE_COMBAT] = "COMBAT";
	lang[m_translate.LANG_COMMON_DATATYPE_ACTIVE] = "ACTIVE";
	lang[m_translate.LANG_COMMON_DIRECTION_HEADER] = "DIRECTION";
	lang[m_translate.LANG_COMMON_DIRECTION_OUTGOING] = "OUTGOING";
	lang[m_translate.LANG_COMMON_DIRECTION_INCOMING] = "INCOMING";
	lang[m_translate.LANG_COMMON_DATASTYLE_HEADER] = "FORMAT";
	lang[m_translate.LANG_COMMON_DATASTYLE_PERSECOND] = "PER-SEC";
	lang[m_translate.LANG_COMMON_DATASTYLE_TOTAL] = "TOTAL";
	lang[m_translate.LANG_COMMON_DATASTYLE_PERCENT] = "PERCENT";

	/* panels: dps */
	lang[m_translate.LANG_PAN_PERSONALDPS_HEADER] = "PERSONAL STATS";
	lang[m_translate.LANG_PAN_PERSONALDPS_OUT] = "OUT";
	lang[m_translate.LANG_PAN_PERSONALDPS_IN] = "IN";
	lang[m_translate.LANG_PAN_PERSONALDPS_CBT] = "CBT";
	lang[m_translate.LANG_PAN_PERSONALDPS_ACT] = "ACT";
	lang[m_translate.LANG_PAN_PERSONALDPS_DAMAGE] = "DAMAGE";
	lang[m_translate.LANG_PAN_PERSONALDPS_PHYS] = "(DAMAGE) PHYS";
	lang[m_translate.LANG_PAN_PERSONALDPS_BUFF] = "(DAMAGE) BUFF";
	lang[m_translate.LANG_PAN_PERSONALDPS_HEALING] = "HEALING";
	lang[m_translate.LANG_PAN_PERSONALDPS_CRIT] = "CRIT RATE";
	lang[m_translate.LANG_PAN_PERSONALDPS_NINETY] = "NINETY RATE";
	lang[m_translate.LANG_PAN_PERSONALDPS_FIFTY] = "FIFTY RATE";
	lang[m_translate.LANG_PAN_PERSONALDPS_EVADE] = "EVADES";
	lang[m_translate.LANG_PAN_PERSONALDPS_BLOCK] = "BLOCKS";
	lang[m_translate.LANG_PAN_PERSONALDPS_ABSORB] = "ABSORBS";
	lang[m_translate.LANG_PAN_PERSONALDPS_INTERRUPT] = "INTERRUPTS";
	lang[m_translate.LANG_PAN_PERSONALDPS_CURRENT] = "CURRENT";
	lang[m_translate.LANG_PAN_PERSONALDPS_HIST] = "HIST";
	lang[m_translate.LANG_PAN_PERSONALDPS_COMBAT] = "CBT";
	lang[m_translate.LANG_PAN_PERSONALDPS_PS] = "PS";
	lang[m_translate.LANG_PAN_PERSONALDPS_DMG] = "DMG";
	lang[m_translate.LANG_PAN_PERSONALDPS_PERSONAL] = "PERSONAL";
	lang[m_translate.LANG_PAN_PERSONALDPS_INTERVAL] = "INTERVAL";
	lang[m_translate.LANG_PAN_PERSONALDPS_MILLISECONDS] = "MILLISECONDS";
	lang[m_translate.LANG_PAN_PERSONALDPS_HISTLEFT] = "current";
	lang[m_translate.LANG_PAN_PERSONALDPS_HISTRIGHT] = "current";
	lang[m_translate.LANG_PAN_PERSONALDPS_SHIELDS] = "BARRIER";

	/* panels: skills */
	lang[m_translate.LANG_PAN_PERSONALSKILLS_HEADER] = "PERSONAL SKILLS";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_OUT] = "OUT";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_IN] = "IN";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_ALL] = "ALL";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_BUFFS] = "BUFFS";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_PHYS] = "PHYS";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_SKREMOVE] = "SKILL REMOVED";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_CURRENT] = "CURRENT";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_HIST] = "HIST";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_COMBAT] = "CBT";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_PERSONAL] = "PERSONAL";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_INTERVAL] = "INTERVAL";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_MILLISECONDS] = "MILLISECONDS";
	lang[m_translate.LANG_PAN_PERSONALSKILLS_HEADERSHORT] = "SKILLS";

	/* panels: target */
	lang[m_translate.LANG_PAN_TARGET_HEADER] = "TARGET";
	lang[m_translate.LANG_PAN_TARGET_LOGAUTO] = "LOGGING AUTO";
	lang[m_translate.LANG_PAN_TARGET_LOGMANUAL] = "LOGGING MANUAL";
	lang[m_translate.LANG_PAN_TARGET_LOGNONE] = "NOT LOGGING";
	lang[m_translate.LANG_PAN_TARGET_LOGUNAVAILABLE] = "LOGGING UNAVAILABLE";
	lang[m_translate.LANG_PAN_TARGET_NOLOCK] = "T.LOCK: NONE";
	lang[m_translate.LANG_PAN_TARGET_COMBAT] = "CBT";
	lang[m_translate.LANG_PAN_TARGET_RS] = "RS";
	lang[m_translate.LANG_PAN_TARGET_DPS] = "DPS";
	lang[m_translate.LANG_PAN_TARGET_TTK] = "TTK";
	lang[m_translate.LANG_PAN_TARGET_START] = "LOG START";
	lang[m_translate.LANG_PAN_TARGET_STOP] = "LOG STOP";

	/* panels: healthbar */
	lang[m_translate.LANG_PAN_HEALTHBAR_HEADER] = "HEALTHBAR";
	lang[m_translate.LANG_PAN_HEALTHBAR_HP] = "HP";

	/* panels: chcli */
	lang[m_translate.LANG_PAN_CHCLI_HEADER] = "AREA STATS";
	lang[m_translate.LANG_PAN_CHCLI_OUT] = "OUT";
	lang[m_translate.LANG_PAN_CHCLI_IN] = "IN";
	lang[m_translate.LANG_PAN_CHCLI_ADPS] = "DMG";
	lang[m_translate.LANG_PAN_CHCLI_BUFFS] = "BUFFS";
	lang[m_translate.LANG_PAN_CHCLI_PHYS] = "PHYS";
	lang[m_translate.LANG_PAN_CHCLI_CND] = "+cnd";
	lang[m_translate.LANG_PAN_CHCLI_TOTAL] = "TOTAL";
	lang[m_translate.LANG_PAN_CHCLI_H] = "H";
	lang[m_translate.LANG_PAN_CHCLI_F] = "F";
	lang[m_translate.LANG_PAN_CHCLI_COMBAT] = "CBT";
	lang[m_translate.LANG_PAN_CHCLI_PS] = "PS";
	lang[m_translate.LANG_PAN_CHCLI_DMG] = "DMG";
	lang[m_translate.LANG_PAN_CHCLI_DISABLED] = "DISABLED ON NON-PARTY PLAYERS";
	lang[m_translate.LANG_PAN_CHCLI_SKREMOVE] = "SKILL REMOVED";
	lang[m_translate.LANG_PAN_CHCLI_CURRENT] = "CURRENT";
	lang[m_translate.LANG_PAN_CHCLI_HIST] = "HIST";
	lang[m_translate.LANG_PAN_CHCLI_AGREMOVE] = "AGENT REMOVED";
	lang[m_translate.LANG_PAN_CHCLI_CHCLI] = "AREA STATS";
	lang[m_translate.LANG_PAN_CHCLI_INTERVAL] = "INTERVAL";
	lang[m_translate.LANG_PAN_CHCLI_MILLISECONDS] = "MILLISECONDS";
	lang[m_translate.LANG_PAN_CHCLI_PCT] = "PCT";
	lang[m_translate.LANG_PAN_CHCLI_NOPLAYERS] = "NO PLAYERS IN RANGE";
	lang[m_translate.LANG_PAN_CHCLI_HISTLEFT] = "current";
	lang[m_translate.LANG_PAN_CHCLI_HISTRIGHT] = "current";

	/* panels: summary */
	lang[m_translate.LANG_PAN_SUMMARY_HEADER] = "SUMMARY";
	lang[m_translate.LANG_PAN_SUMMARY_CBTTIME] = "combat time";
	lang[m_translate.LANG_PAN_SUMMARY_ADPSOUT] = "dps out";
	lang[m_translate.LANG_PAN_SUMMARY_TGADPSOUT] = "tg dps out";
	lang[m_translate.LANG_PAN_SUMMARY_ADPSIN] = "dps in";
	lang[m_translate.LANG_PAN_SUMMARY_TGADPSIN] = "tg dps in";
	lang[m_translate.LANG_PAN_SUMMARY_CRIT] = "crit rate";
	lang[m_translate.LANG_PAN_SUMMARY_NINETY] = "ninety rate";
	lang[m_translate.LANG_PAN_SUMMARY_FIFTY] = "fifty rate";
	lang[m_translate.LANG_PAN_SUMMARY_MOVING] = "moving rate";
	lang[m_translate.LANG_PAN_SUMMARY_FLANK] = "flank rate";
	lang[m_translate.LANG_PAN_SUMMARY_CANCELTIME] = "cancel time";
	lang[m_translate.LANG_PAN_SUMMARY_RESCOUNT] = "res count";
	lang[m_translate.LANG_PAN_SUMMARY_RESTIME] = "res time";
	lang[m_translate.LANG_PAN_SUMMARY_DOWNCOUNT] = "down count";
	lang[m_translate.LANG_PAN_SUMMARY_CLEANSEDOUT] = "cleanse out";
	lang[m_translate.LANG_PAN_SUMMARY_STRIPPEDOUT] = "strip out";
	lang[m_translate.LANG_PAN_SUMMARY_GLANCE] = "glance rate";
	lang[m_translate.LANG_PAN_SUMMARY_EVADES] = "evades";
	lang[m_translate.LANG_PAN_SUMMARY_INTERRUPTS] = "interrupts";
	lang[m_translate.LANG_PAN_SUMMARY_MISSED] = "miss rate";
	lang[m_translate.LANG_PAN_SUMMARY_DODGE] = "dodges used";
	lang[m_translate.LANG_PAN_SUMMARY_HIST] = "HIST";
	lang[m_translate.LANG_PAN_SUMMARY_SQSHORT1] = "player must be";
	lang[m_translate.LANG_PAN_SUMMARY_SQSHORT2] = "in party/squad";
	lang[m_translate.LANG_PAN_SUMMARY_CLEANSEDIN] = "cleanse in";
	lang[m_translate.LANG_PAN_SUMMARY_STRIPPEDIN] = "strip in";
	lang[m_translate.LANG_PAN_SUMMARY_DOWNTIME] = "down time";
	lang[m_translate.LANG_PAN_SUMMARY_CANCELCOUNT] = "cancel count";
	lang[m_translate.LANG_PAN_SUMMARY_SHIELD] = "shield rate";

	/* panels: logger */
	lang[m_translate.LANG_PAN_LOGGER_HEADER] = "LOGGER";
	lang[m_translate.LANG_PAN_LOGGER_CBT] = "CBT";
	lang[m_translate.LANG_PAN_LOGGER_ENG] = "ENG";
	lang[m_translate.LANG_PAN_LOGGER_GME] = "GME";
	lang[m_translate.LANG_PAN_LOGGER_BOT] = "BOT";
	lang[m_translate.LANG_PAN_LOGGER_TOP] = "TOP";
	lang[m_translate.LANG_PAN_LOGGER_AUTO] = "AUTO";
	lang[m_translate.LANG_PAN_LOGGER_SCROLL] = "SCRL";
	lang[m_translate.LANG_PAN_LOGGER_FILTER] = "FILTER";
	lang[m_translate.LANG_PAN_LOGGER_RESQ] = "RES.QDEP";
	lang[m_translate.LANG_PAN_LOGGER_CBTQ] = "CBT.QDEP";
	lang[m_translate.LANG_PAN_LOGGER_MBLK] = "M.BLKS";
	lang[m_translate.LANG_PAN_LOGGER_MSZ] = "M.SZ";
	lang[m_translate.LANG_PAN_LOGGER_AG] = "LIM.AG";
	lang[m_translate.LANG_PAN_LOGGER_CH] = "LIM.CH";
	lang[m_translate.LANG_PAN_LOGGER_CEA] = "CES";
	lang[m_translate.LANG_PAN_LOGGER_GRC] = "GRC";
	lang[m_translate.LANG_PAN_LOGGER_CBS] = "CBS";
	lang[m_translate.LANG_PAN_LOGGER_CCX] = "CCX";
	lang[m_translate.LANG_PAN_LOGGER_TGC] = "TGC";
	lang[m_translate.LANG_PAN_LOGGER_SCR] = "SCR";
	lang[m_translate.LANG_PAN_LOGGER_RTH] = "RTH";
	lang[m_translate.LANG_PAN_LOGGER_CCS] = "CCS";
	lang[m_translate.LANG_PAN_LOGGER_BCX] = "BCX";
	lang[m_translate.LANG_PAN_LOGGER_GPT] = "GPT";
	lang[m_translate.LANG_PAN_LOGGER_RND] = "RND";
	lang[m_translate.LANG_PAN_LOGGER_REF] = "UPK";
	lang[m_translate.LANG_PAN_LOGGER_LOGGER] = "LOGGER";
	lang[m_translate.LANG_PAN_LOGGER_CHANNEL] = "CHANNEL";
	lang[m_translate.LANG_PAN_LOGGER_SIM] = "SIM";
	lang[m_translate.LANG_PAN_LOGGER_MCI] = "MCI";
	lang[m_translate.LANG_PAN_LOGGER_MCO] = "MCO";

	/* panels: compass */
	lang[m_translate.LANG_PAN_COMPASS_HEADER] = "COMPASS";
	lang[m_translate.LANG_PAN_COMPASS_N] = "N";
	lang[m_translate.LANG_PAN_COMPASS_E] = "E";
	lang[m_translate.LANG_PAN_COMPASS_S] = "S";
	lang[m_translate.LANG_PAN_COMPASS_W] = "W";
	lang[m_translate.LANG_PAN_COMPASS_BEARING] = "BEARING";

	/* panels: metrics */
	lang[m_translate.LANG_PAN_METRICS_HEADER] = "METRICS";
	lang[m_translate.LANG_PAN_METRICS_FPS] = "F";
	lang[m_translate.LANG_PAN_METRICS_PING] = "P";
	lang[m_translate.LANG_PAN_METRICS_MAPTYPE] = "MAP.TYPE";
	lang[m_translate.LANG_PAN_METRICS_MAPID] = "MAP.ID";
	lang[m_translate.LANG_PAN_METRICS_MAPLV] = "MAP.LV";
	lang[m_translate.LANG_PAN_METRICS_BUILDGW] = "BUILD.GW";
	lang[m_translate.LANG_PAN_METRICS_BUILDARC] = "BUILD.ARC";
	lang[m_translate.LANG_PAN_METRICS_TICK] = "R";

	/* panels: gathering */
	lang[m_translate.LANG_PAN_GATHER_HEADER] = "GATHERING";
	lang[m_translate.LANG_PAN_GATHER_PICKH] = "picks/h";
	lang[m_translate.LANG_PAN_GATHER_AXEH] = "axes/h";
	lang[m_translate.LANG_PAN_GATHER_SICKLEH] = "sickles/h";
	lang[m_translate.LANG_PAN_GATHER_PICKED] = "picked";
	lang[m_translate.LANG_PAN_GATHER_AXED] = "axed";
	lang[m_translate.LANG_PAN_GATHER_SICKLED] = "sickled";
	lang[m_translate.LANG_PAN_GATHER_TOOLS] = "tools";
	lang[m_translate.LANG_PAN_GATHER_PICKREMAIN] = "picks remaining";
	lang[m_translate.LANG_PAN_GATHER_AXEREMAIN] = "axes remaining";
	lang[m_translate.LANG_PAN_GATHER_SICKLEREMAIN] = "sickles remaining";
	lang[m_translate.LANG_PAN_GATHER_TIME] = "measuring for";

	/* panels: buffs */
	lang[m_translate.LANG_PAN_BUFFS_HEADER] = "BUFF TABLE";
	lang[m_translate.LANG_PAN_BUFFS_WARNING] = "WARNING: CPU HEAVY";

	/* panels: detail */
	lang[m_translate.LANG_PAN_DETAIL_HEADER] = "DETAIL";
	lang[m_translate.LANG_PAN_DETAIL_MIN] = "min";
	lang[m_translate.LANG_PAN_DETAIL_MAX] = "max";
	lang[m_translate.LANG_PAN_DETAIL_ELAPSED] = "elapsed";

	/* panels: options */
	lang[m_translate.LANG_PAN_OPTIONS_HEADER] = "OPTIONS";
	lang[m_translate.LANG_PAN_OPTIONS_PANELS] = "WINDOWS";
	lang[m_translate.LANG_PAN_OPTIONS_SUMMARIES] = "TOOLTIP";
	lang[m_translate.LANG_PAN_OPTIONS_BASIC] = "GENERAL";
	lang[m_translate.LANG_PAN_OPTIONS_Y] = "Y";
	lang[m_translate.LANG_PAN_OPTIONS_N] = "N";
	lang[m_translate.LANG_PAN_OPTIONS_SM_LINK] = "LINK PANELS";
	lang[m_translate.LANG_PAN_OPTIONS_SM_AUTOOPEN] = "AUTO OPEN";
	lang[m_translate.LANG_PAN_OPTIONS_SM_ADPSOUT] = "DPS OUT";
	lang[m_translate.LANG_PAN_OPTIONS_SM_ADPSIN] = "DPS IN";
	lang[m_translate.LANG_PAN_OPTIONS_SM_BUFFS] = "BUFFS";
	lang[m_translate.LANG_PAN_OPTIONS_SM_RATES] = "RATES";
	lang[m_translate.LANG_PAN_OPTIONS_SM_AGSTATES] = "AGENT STATES";
	lang[m_translate.LANG_PAN_OPTIONS_SM_BUFFEVENTS] = "BUFF EVENTS";
	lang[m_translate.LANG_PAN_OPTIONS_SM_RESULTS] = "RESULTS";
	lang[m_translate.LANG_PAN_OPTIONS_BS_LOCKTARGET] = "LOCK PREFTARGET TO ENCOUNTER NPC";
	lang[m_translate.LANG_PAN_OPTIONS_BS_SAVELOGS] = "SAVE EVTC LOGS ON ENCOUNTERS";
	lang[m_translate.LANG_PAN_OPTIONS_BS_NPCINPATH] = "USE NPC NAME IN EVTC PATH";
	lang[m_translate.LANG_PAN_OPTIONS_BS_COMPRESS] = "COMPRESS EVTC WITH PS (WIN 10)";
	lang[m_translate.LANG_PAN_OPTIONS_BS_PANSNAP] = "PANEL SNAP TO GRID";
	lang[m_translate.LANG_PAN_OPTIONS_BS_ALWAYSREQMOD] = "INPUT ALWAYS REQUIRES MODIFIERS";
	lang[m_translate.LANG_PAN_OPTIONS_BS_COMBATDETAIL] = "PANEL COMBAT DETAIL";
	lang[m_translate.LANG_PAN_OPTIONS_BS_VERBOSITY] = "PANEL VERBOSITY";
	lang[m_translate.LANG_PAN_OPTIONS_BS_GUILDINPATH] = "USE GUILD NAME IN EVTC PATH";
	lang[m_translate.LANG_PAN_OPTIONS_BS_BGBARS] = "SHOW BACKGROUND BARS";
	lang[m_translate.LANG_PAN_OPTIONS_BS_FWDINPUT] = "MODIFIERS FORWARD INPUT TO CLIENT";
	lang[m_translate.LANG_PAN_OPTIONS_BS_TRANSPARENCY] = "TRANSPARENCY BIAS";
	lang[m_translate.LANG_PAN_OPTIONS_BS_BGBARCOLOUR] = "BACKGROUND BAR PROFESSION COLOUR";
	lang[m_translate.LANG_PAN_OPTIONS_BS_PLAYERINPATH] = "USE PLAYER NAME IN EVTC PATH";
	lang[m_translate.LANG_PAN_OPTIONS_BS_ALTERNATEUI] = "USE ALTERNATE UI";
	lang[m_translate.LANG_PAN_OPTIONS_BS_RECOUNTLIKE] = "RECOUNT-LIKE TOTAL+DPS ON STATS";
	lang[m_translate.LANG_PAN_OPTIONS_BS_ALTUITRIM] = "TRIM NAME AND ABBREVATION PADDING";
	lang[m_translate.LANG_PAN_OPTIONS_BS_ALTUIMOVELOCK] = "REQUIRE MODIFIERS TO MOVE WINDOWS";
	lang[m_translate.LANG_PAN_OPTIONS_BS_MENULOCK] = "REQUIRE MODIFIERS TO SHOW MENUS";
	lang[m_translate.LANG_PAN_OPTIONS_BS_NOTOTALS] = "DONT SHOW TOTALS";
	lang[m_translate.LANG_PAN_OPTIONS_BS_ALTUICLICKLOCK] = "REQUIRE MODIFIERS TO CLICK";
	lang[m_translate.LANG_PAN_OPTIONS_LOGGING] = "LOGGING";
	lang[m_translate.LANG_PAN_OPTIONS_SM_HIDEZEROBUFFS] = "HIDE ZERO BUFFS";

	/* panels: templates */
	lang[m_translate.LANG_PAN_TEMPLATES_HEADER] = "TEMPLATES";
	lang[m_translate.LANG_PAN_TEMPLATES_LOAD] = "LOAD";
	lang[m_translate.LANG_PAN_TEMPLATES_SAVE] = "SAVE";
	lang[m_translate.LANG_PAN_TEMPLATES_NONE] = "NO TEMPLATES";
	lang[m_translate.LANG_PAN_TEMPLATES_TRAITS] = "TRAITS";
	lang[m_translate.LANG_PAN_TEMPLATES_GEAR] = "GEAR";
	lang[m_translate.LANG_PAN_TEMPLATES_SKILLS] = "SKILLS";
	lang[m_translate.LANG_PAN_TEMPLATES_LEGENDARY] = "LEGENDARY";
	lang[m_translate.LANG_PAN_TEMPLATES_PVP] = "PVP";
	//lang[m_translate.LANG_PAN_TEMPLATES_SAVETRAITS] = "SAVE TRAITS";
	//lang[m_translate.LANG_PAN_TEMPLATES_SAVEGEAR] = "SAVE GEAR";
	lang[m_translate.LANG_PAN_TEMPLATES_COPY] = "copied";
	lang[m_translate.LANG_PAN_TEMPLATES_NAME] = "NAME";
	lang[m_translate.LANG_PAN_TEMPLATES_DELETE] = "delete";
	lang[m_translate.LANG_PAN_TEMPLATES_OVERWRITE] = "OVERWRITE";
	lang[m_translate.LANG_PAN_TEMPLATES_SAVED] = "saved";
	lang[m_translate.LANG_PAN_TEMPLATES_LOADING] = "loading...";
	lang[m_translate.LANG_PAN_TEMPLATES_REDUCEDRATE] = "map rate restrictions in place (500ms)";
	lang[m_translate.LANG_PAN_TEMPLATES_DISABLED] = "unavailable";
	lang[m_translate.LANG_PAN_TEMPLATES_CANCEL] = "CANCEL";
export { lang }; export default lang;