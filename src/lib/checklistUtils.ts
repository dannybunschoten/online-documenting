import data from "@/additionalData.json";
import { Checklist } from "@/app/types";

/**
 * Creates a checklist item from inspection data
 */
export function createChecklistItem(
  prefix: string,
  text: string,
  checkGroupName: string,
): Checklist {
  const result = data.filter(
    (check) =>
      check?.Check?.Text === text && check?.CheckGroup?.Name === checkGroupName,
  )[0];

  return {
    prefix,
    question: text,
    status: result?.ResultValues?.[0]?.DisplayText || "N.v.t.",
    findings: result?.Actions?.length || 0,
    pictures: result?.Photos?.length || 0,
  };
}

/**
 * Gets algemeen checklist items
 */
export function getAlgemeenChecklist(): Checklist[] {
  return [
    createChecklistItem(
      "0101",
      "Liftboek / berekeningsdocumenten aanwezig",
      "Algemeen",
    ),
    createChecklistItem(
      "0102",
      "Typegoedkeuring NoBo aanwezig (machines voor 1-1-2010)",
      "Algemeen",
    ),
    createChecklistItem(
      "0103",
      "EG-verklaring van overeenstemming aanwezig (machines na 1-1-2010)",
      "Algemeen",
    ),
    createChecklistItem(
      "0104",
      "Instructie- / opbouwboeken aanwezig en compleet",
      "Algemeen",
    ),
    createChecklistItem(
      "0105",
      "Opstellingslocatie binnen het toepassingsgebied dat de fabrikant heeft voorzien",
      "Algemeen",
    ),
    createChecklistItem(
      "0106",
      "Elektrisch / hydraulisch schema aanwezig",
      "Algemeen",
    ),
    createChecklistItem("0107", "Laatste keuringsrapport aanwezig", "Algemeen"),
    createChecklistItem(
      "0108",
      "Certificaten (staalkabels, vanginrichting)",
      "Algemeen",
    ),
    createChecklistItem(
      "0109",
      "Bij verankering aan bouwsteiger: berekening aanwezig",
      "Algemeen",
    ),
    createChecklistItem(
      "0110",
      "Keuring na ingrijpende wijzigingen/herstellingen cfm eisen fabrikant uitgevoerd",
      "Algemeen",
    ),
    createChecklistItem(
      "0199",
      "Overige opmerkingen aangaande dit hoofdstuk",
      "Algemeen",
    ),
  ];
}

/**
 * Gets mast checklist items
 */
export function getMastChecklist(): Checklist[] {
  return [
    createChecklistItem("0201", "Constructie mast PGBL", "Mast"),
    createChecklistItem("0202", "Eindmast aanwezig (eventueel)", "Mast"),
    createChecklistItem("0203", "Bout- / penverbinding / borging", "Mast"),
    createChecklistItem("0204", "Geleiding en mastdelen", "Mast"),
    createChecklistItem("0205", "Kabelvangers", "Mast"),
    createChecklistItem("0206", "Kabelton", "Mast"),
    createChecklistItem(
      "0299",
      "Overige opmerkingen aangaande dit hoofdstuk",
      "Mast",
    ),
  ];
}

/**
 * Gets basisstation checklist items
 */
export function getBasisstationChecklist(): Checklist[] {
  return [
    createChecklistItem(
      "0301",
      "Constructie basisstation (grondkooi)",
      "Basisstation (grondkooi)",
    ),
    createChecklistItem(
      "0302",
      "Bout- / penverbinding / borging",
      "Basisstation (grondkooi)",
    ),
    createChecklistItem("0303", "Buffers", "Basisstation (grondkooi)"),
    createChecklistItem(
      "0304",
      "Buffers aanwezig voor kooi en contragewicht",
      "Basisstation (grondkooi)",
    ),
    createChecklistItem(
      "0305",
      "Toestand buffers en bevestigingen",
      "Basisstation (grondkooi)",
    ),
    createChecklistItem(
      "0306",
      "Uitloop kooi tot buffer(s)",
      "Basisstation (grondkooi)",
    ),
    createChecklistItem(
      "0307",
      "Uitloop kooi bij volledige invering buffer(s)",
      "Basisstation (grondkooi)",
    ),
    createChecklistItem(
      "0309",
      "Toegangsdeur basisstation",
      "Basisstation (grondkooi)",
    ),
    createChecklistItem(
      "0310",
      "Afscherming basisstation",
      "Basisstation (grondkooi)",
    ),
    createChecklistItem(
      "0311",
      "Afscherming contraballast",
      "Basisstation (grondkooi)",
    ),
    createChecklistItem("0312", "Oprit (antislip)", "Basisstation (grondkooi)"),
    createChecklistItem(
      "0313",
      "Veiligheidsstuit (aan te brengen zonder onder de kooi te komen)",
      "Basisstation (grondkooi)",
    ),
    createChecklistItem(
      "0399",
      "Overige opmerkingen aangaande dit hoofdstuk",
      "Basisstation (grondkooi)",
    ),
  ];
}
