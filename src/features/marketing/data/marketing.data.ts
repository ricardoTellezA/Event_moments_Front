import {
  CameraIcon,
  CheckIcon,
  ClockIcon,
  EyeIcon,
  ImagesIcon,
  LockIcon,
  QrCodeIcon,
  SparklesIcon,
  UploadIcon,
  UsersIcon,
} from "lucide-react";

export const marketingNavItems = [
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Precios", href: "/precios" },
  { label: "Mis albumes", href: "/mis-albumes" },
];

export const howItWorksSteps = [
  {
    title: "Crea",
    description: "Nombre, fecha y duracion. Tu album queda listo en menos de un minuto.",
    icon: SparklesIcon,
  },
  {
    title: "Comparte",
    description: "Envia el link o imprime el QR para que todos entren desde el telefono.",
    icon: QrCodeIcon,
  },
  {
    title: "Captura",
    description: "Los invitados suben fotos desde el navegador, sin instalar una app.",
    icon: UploadIcon,
  },
  {
    title: "Revela",
    description: "Activa Reveal Mode para abrir los recuerdos cuando termine el evento.",
    icon: EyeIcon,
  },
];

export const featureCards = [
  {
    title: "Sin instalar nada",
    description: "Los invitados abren el QR y suben recuerdos desde su navegador.",
    icon: CameraIcon,
  },
  {
    title: "QR instantaneo",
    description: "Un link corto y un QR visual para mesas, invitaciones o grupos.",
    icon: QrCodeIcon,
  },
  {
    title: "Reveal Mode",
    description: "Guarda todo en secreto y revela la galeria cuando llegue el momento.",
    icon: LockIcon,
  },
  {
    title: "Fotos de todos",
    description: "Un solo album colaborativo con recuerdos desde muchos puntos de vista.",
    icon: UsersIcon,
  },
  {
    title: "Privacidad",
    description: "Prepara albumes abiertos, por link o con PIN cuando lo necesites.",
    icon: LockIcon,
  },
  {
    title: "Timeline",
    description: "Las fotos se sienten ordenadas por los momentos del evento.",
    icon: ClockIcon,
  },
];

export const eventTypes = [
  "Bodas",
  "Cumpleanos",
  "XV anos",
  "Graduaciones",
  "Viajes",
  "Fiestas",
  "Baby showers",
  "Eventos",
];

export const pricingPlans = [
  {
    name: "Free",
    eyebrow: "Plan gratis",
    price: "Gratis",
    description: "Para probar tu primer album con una experiencia simple.",
    cta: "Crear gratis",
    featured: false,
    features: ["1 album", "24 horas", "Hasta 100 fotos", "QR compartible"],
  },
  {
    name: "Event Pass",
    eyebrow: "Mas elegido",
    price: "$79",
    suffix: "MXN / evento",
    description: "Ideal para bodas, cumpleanos y reuniones de varios dias.",
    cta: "Mejorar album",
    featured: true,
    features: [
      "Hasta 30 dias",
      "1,000 fotos",
      "Videos",
      "Album privado con PIN",
      "Reveal Mode",
      "Descarga en ZIP",
    ],
  },
  {
    name: "Party+",
    eyebrow: "Eventos grandes",
    price: "$149",
    suffix: "MXN / evento",
    description: "Mas capacidad visual para fiestas con muchos invitados.",
    cta: "Elegir Party+",
    featured: false,
    features: ["3,000 fotos", "Videos", "Retos fotograficos", "Sin branding"],
  },
];

export const faqItems = [
  {
    question: "Los invitados necesitan crear cuenta?",
    answer: "No. Entran con el QR o link y suben fotos desde el navegador.",
  },
  {
    question: "Puedo ocultar las fotos hasta el final?",
    answer: "Si. Reveal Mode guarda los recuerdos y muestra la galeria al terminar.",
  },
  {
    question: "Esto ya conecta con pagos o backend?",
    answer: "Todavia no. Esta etapa es solo frontend con mocks e interacciones visuales.",
  },
  {
    question: "Puedo usarlo en telefono?",
    answer: "La experiencia esta pensada mobile-first porque la mayoria entra por QR.",
  },
];

export const galleryImages = [
  {
    id: "toast",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    alt: "Pareja celebrando en una boda",
  },
  {
    id: "dance",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
    alt: "Invitados celebrando con luces",
  },
  {
    id: "table",
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80",
    alt: "Mesa decorada para evento",
  },
  {
    id: "friends",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    alt: "Grupo de amigos sonriendo",
  },
  {
    id: "cake",
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
    alt: "Celebracion de cumpleanos",
  },
  {
    id: "party",
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=80",
    alt: "Fiesta de noche",
  },
];

export const heroPreviewPhotos = galleryImages.slice(0, 3);

export const checkIcon = CheckIcon;
export const imagesIcon = ImagesIcon;
