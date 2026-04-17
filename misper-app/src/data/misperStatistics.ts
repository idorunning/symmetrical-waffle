import { BehaviouralCategory } from '../types'
import type { KoesterStatRow } from '../types'

// Approximate median values from Robert Koester, "Lost Person Behavior" (2008).
// Distances represent straight-line displacement from the IPP (Initial Planning Point).
export const KOESTER_STATISTICS: KoesterStatRow[] = [
  {
    category: BehaviouralCategory.Dementia,
    p50RadiusKm: 0.5,
    p95RadiusKm: 5.0,
    meanDistanceKm: 1.3,
    typicalEnvironments: ['Residential', 'Urban', 'Roads & Paths', 'Agricultural Land'],
    mobilityNotes:
      'Typically does not seek shelter; travels roads and paths; may attempt to return to a ' +
      'former home address. Does not respond consistently to own name. High found-deceased rate ' +
      'if not located promptly — prioritise swift containment.',
    foundDeceased: 26,
    selfResolution: 4,
    source: 'Koester (2008), Table 4-1',
  },
  {
    category: BehaviouralCategory.Despondent,
    p50RadiusKm: 1.5,
    p95RadiusKm: 11.0,
    meanDistanceKm: 3.2,
    typicalEnvironments: ['Woodland', 'Water Features', 'Remote Terrain', 'Parked Vehicles'],
    mobilityNotes:
      'May actively attempt to avoid searchers and emergency services. Prefers seclusion and ' +
      'concealment. Elevated lethality risk — water features, elevated terrain, and vehicles ' +
      'are priority search areas. Attraction signals are unlikely to be effective.',
    foundDeceased: 53,
    selfResolution: 6,
    source: 'Koester (2008), Table 11-1',
  },
  {
    category: BehaviouralCategory.SubstanceMisuse,
    p50RadiusKm: 1.0,
    p95RadiusKm: 8.0,
    meanDistanceKm: 2.1,
    typicalEnvironments: ['Urban', 'Residential', 'Drainage Features', 'Under Structures'],
    mobilityNotes:
      'Erratic and unpredictable travel pattern; subject may shelter in place once incapacitated. ' +
      'Drainage ditches, culverts, and confined or sheltered spaces are priority. May not respond ' +
      'to searchers if incapacitated.',
    foundDeceased: 20,
    selfResolution: 15,
    source: 'Koester (2008), Table 9-1',
  },
  {
    category: BehaviouralCategory.MentalHealth,
    p50RadiusKm: 1.2,
    p95RadiusKm: 9.0,
    meanDistanceKm: 2.8,
    typicalEnvironments: ['Urban', 'Residential', 'Transport Links', 'Open Ground'],
    mobilityNotes:
      'Travel distance varies considerably by condition and presentation. Subject may use public ' +
      'transport to travel beyond initial search area. Generally responds positively to calm, ' +
      'non-confrontational contact. Consider known associates and frequented locations.',
    foundDeceased: 18,
    selfResolution: 12,
    source: 'Koester (2008), Table 10-1',
  },
  {
    category: BehaviouralCategory.Juvenile,
    p50RadiusKm: 0.4,
    p95RadiusKm: 3.5,
    meanDistanceKm: 0.9,
    typicalEnvironments: ['Residential', 'Play Areas', 'Schools', 'Friend & Family Addresses'],
    mobilityNotes:
      'Young children (under 6) are typically found very close to the last known point. Older ' +
      'juveniles may travel further and seek peers. Contact known associates, friends, and ' +
      'social media connections early. Responds well to familiar voices.',
    foundDeceased: 3,
    selfResolution: 30,
    source: 'Koester (2008), Table 6-1',
  },
  {
    category: BehaviouralCategory.Autism,
    p50RadiusKm: 0.8,
    p95RadiusKm: 6.0,
    meanDistanceKm: 1.7,
    typicalEnvironments: ['Water Features', 'Transport Corridors', 'Familiar Routes', 'Enclosed Spaces'],
    mobilityNotes:
      'High affinity for water — ALL water features within the search area must be prioritised. ' +
      'Subject may follow linear features (roads, railway lines, footpaths). Does not reliably ' +
      'respond to own name. High found-deceased rate, particularly near water. Avoid direct ' +
      'confrontation; use familiar items or persons to attract.',
    foundDeceased: 32,
    selfResolution: 8,
    source: 'Koester (2008), Table 7-1; Project Lifesaver data',
  },
  {
    category: BehaviouralCategory.LostBenign,
    p50RadiusKm: 2.0,
    p95RadiusKm: 14.0,
    meanDistanceKm: 4.5,
    typicalEnvironments: ['Woodland', 'Moorland', 'Hillside', 'Marked Trails'],
    mobilityNotes:
      'Will typically remain on trails, ridgelines, or other navigational features. Responds well ' +
      'to attraction signals (whistles, lights, shouting). High self-resolution rate. Highest ' +
      'priority if weather is deteriorating — exposure risk increases rapidly.',
    foundDeceased: 5,
    selfResolution: 48,
    source: 'Koester (2008), Table 5-1',
  },
]
