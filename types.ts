export type Language = 'en' | 'hi' | 'mr';

export type TabType = 'home' | 'sell' | 'createown' | 'recyclers' | 'dashboard';

export type RoleMode = 'collector' | 'recycler';

export type MaterialKey = 
  | 'tv' 
  | 'cables' 
  | 'dishtv' 
  | 'phone' 
  | 'pcb' 
  | 'motor' 
  | 'battery' 
  | 'plastic';

export interface ScrapPriceInfo {
  id: string;
  key: MaterialKey;
  name: string;
  nameHi: string;
  nameMr: string;
  currentRate: number;
  unit: string;
  change24h: number;
  trend: 'up' | 'down' | 'stable';
  high7d: number;
  low7d: number;
  marketSource: string;
  purityGrade: string;
  description: string;
  sparkline: number[];
  threeDType: string;
}

export interface RecyclerFacility {
  id: string;
  name: string;
  cpcbRegistrationNo: string;
  location: string;
  city: string;
  distanceKm: number;
  reliabilityScore: number;
  verified: boolean;
  phone: string;
  materialsAccepted: string[];
  pickupAvailable: boolean;
  minWeightKg: number;
  specialOfferRate?: string;
  operatingHours: string;
}

export interface SaleHistoryItem {
  id: string;
  lotId: string;
  itemTitle: string;
  category: MaterialKey;
  weightKg: number;
  ratePerKg: number;
  totalAmount: number;
  date: string;
  buyerName: string;
  buyerCpcb: string;
  paymentMethod: 'UPI' | 'Cash' | 'Bank Transfer';
  paymentStatus: 'Paid' | 'Processing' | 'Pending Handover';
  handoverCode: string;
  materialPurity: string;
  recoveredResources: string;
}

export interface RepairHistoryItem {
  id: string;
  deviceName: string;
  category: string;
  issueDiagnosed: string;
  scrapEstimatedValue: number;
  refurbishedMarketValue: number;
  netValueSaved: number;
  repairFacility: string;
  date: string;
  status: 'Refurbished & Re-sold' | 'Repaired & Returned' | 'Parts Harvested';
  daysTurnaround: number;
  warrantyProvided: string;
}

export interface DIYProject {
  id: string;
  title: string;
  titleHi: string;
  titleMr: string;
  materialType: 'plastic_bottles' | 'soft_toys' | 'wire_metal' | 'dishtv_ewaste' | 'cardboard';
  materialLabel: string;
  difficulty: 'Easy' | 'Intermediate' | 'Creative Pro';
  timeEstimate: string;
  ecoPoints: number;
  plasticDivertedGrams?: number;
  metalDivertedGrams?: number;
  youtubeVideoId: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  summary: string;
  materialsList: string[];
  steps: {
    number: number;
    title: string;
    description: string;
    timestampSec?: number;
  }[];
  userLikes: number;
  completedCount: number;
  featuredQuote: string;
}

export interface AgentAnalysisResult {
  detectedItem: string;
  brand: string;
  model: string;
  dimensions: string;
  estimatedWeightKg: number;
  primaryMaterial: string;
  purityGrade: string;
  confidenceScore: number;
  predictedPriceMin: number;
  predictedPriceMax: number;
  decisionRecommendation: 'sell_recycle' | 'direct_repair' | 'create_own_diy';
  decisionRationale: string;
  marketSourcesCited: string[];
  model3DType: 'tv' | 'cables' | 'dishtv' | 'phone' | 'pcb' | 'motor' | 'battery';
  keyComponentsFound: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  analysis?: AgentAnalysisResult;
  mediaUrl?: string;
  has3DPreview?: boolean;
  suggestedPrompts?: string[];
}

export interface UserSubmittedLot {
  id: string;
  material: string;
  category: MaterialKey;
  weightKg: number;
  condition: 'Good (Repairable)' | 'Standard Scrap' | 'Damaged/Mixed';
  estimatedValue: number;
  matchedRecycler?: string;
  pickupRequested: boolean;
  photoUrl?: string;
  createdAt: string;
}
