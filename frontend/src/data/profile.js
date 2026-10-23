// Single source of truth for all portfolio content.
// To update the resume, just replace /public/resume.pdf — no code change needed.
// NOTE: github / instagram / naukri URLs below are placeholders — replace with your real profile URLs.

export const profile = {
  name: "Vikash Malviya",
  firstName: "Vikash",
  role: "Data Analyst",
  roles: ["Data Analyst", "Business Analyst", "MIS Reporting"],
  tagline:
    "I turn raw operational data into decision-ready dashboards, reports and stories that move business forward.",
  location: "Sojat, Rajasthan, India",
  email: "vikash.malviya2495@gmail.com",
  phoneDisplay: "+91 99296 91872",
  phoneHref: "tel:+919929691872",
  whatsapp:
    "https://wa.me/919929691872?text=Hi%20Vikash%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20an%20opportunity.",
  resumeUrl: "/resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/vikash-malviya-030337307",
    github: "https://github.com/vikash-malviya", // placeholder — update me
    instagram: "https://www.instagram.com/_vikash__malviya___",
    naukri: "https://www.naukri.com/mnjuser/profile", // placeholder — update me
  },
};

export const stats = [
  { value: 10000, suffix: "+", label: "Retail records analysed" },
  { value: 7000, suffix: "+", label: "Churn records modelled" },
  { value: 15, suffix: "%", label: "Regional gap uncovered" },
  { value: 3, suffix: "", label: "End-to-end BI projects" },
];

export const skillGroups = [
  {
    title: "Query & Model",
    skills: [
      { name: "SQL — Joins, CTEs, Window Functions", level: 88, icon: "db" },
      { name: "Power BI — Power Query, DAX, Modelling", level: 90, variant: "pbi" },
      { name: "Advanced Excel — XLOOKUP, Pivots, Dashboards", level: 92, variant: "xls" },
      { name: "Python — Pandas, NumPy, Matplotlib", level: 80, slug: "python" },
    ],
  },
  {
    title: "Analyse & Report",
    tags: [
      "Data Cleaning",
      "EDA",
      "KPI Analysis",
      "Trend Analysis",
      "Statistical Analysis",
      "MIS Reporting",
      "Data Validation",
      "Stakeholder Reporting",
    ],
  },
  {
    title: "Tools & Craft",
    tags: ["Jira", "Git & GitHub", "Power Query", "DAX", "Seaborn", "Communication", "Problem Solving", "Presentation"],
  },
];

export const projects = [
  {
    id: "retail",
    title: "Retail Sales Performance Dashboard",
    subtitle: "SQL + Power BI",
    description:
      "Analysed 10,000+ retail sales records to track revenue, regional performance and category trends. Built SQL pipelines (joins, aggregations, CTEs) to clean raw transactions, then modelled DAX measures for YoY growth, AOV and top SKUs — exposing a region underperforming by 15% and seasonal demand patterns, packaged into an executive summary.",
    tags: ["SQL", "Power BI", "DAX", "CTEs"],
    image: "/assets/project-retail.png",
    alt: "Power BI style dark dashboard for the retail sales performance project with KPI cards and charts",
    span: "md:col-span-7",
  },
  {
    id: "churn",
    title: "Customer Churn Prediction Model",
    subtitle: "Python + Machine Learning",
    description:
      "Built a churn classification model on 7,000+ telecom customer records. Cleaned data, engineered features and ran EDA to isolate the main churn drivers, validated on accuracy, precision and recall, then visualised results for a non-technical audience to steer retention priorities.",
    tags: ["Python", "Pandas", "EDA", "Classification"],
    image: "/assets/project-churn.png",
    alt: "Power BI style dark dashboard for the customer churn prediction project",
    span: "md:col-span-5",
  },
  {
    id: "stock",
    title: "Stock Market Analysis & Visualization",
    subtitle: "BCA Final Year Project",
    description:
      "End-to-end analysis of stock market data — Python for cleaning and analysis, SQL for querying, and an interactive Power BI dashboard for insight. Documented in a formal project report and defended in a viva at Manipal University Jaipur.",
    tags: ["Python", "SQL", "Power BI", "Research"],
    image: "/assets/project-stock.png",
    alt: "Power BI style dark dashboard for the stock market analysis project with candlestick and KPI panels",
    span: "md:col-span-12",
  },
];

export const dashboardSeries = [
  { month: "Jan", revenue: 42, orders: 310 },
  { month: "Feb", revenue: 48, orders: 352 },
  { month: "Mar", revenue: 45, orders: 330 },
  { month: "Apr", revenue: 56, orders: 410 },
  { month: "May", revenue: 61, orders: 448 },
  { month: "Jun", revenue: 58, orders: 421 },
  { month: "Jul", revenue: 67, orders: 489 },
  { month: "Aug", revenue: 74, orders: 530 },
  { month: "Sep", revenue: 70, orders: 505 },
  { month: "Oct", revenue: 82, orders: 590 },
  { month: "Nov", revenue: 91, orders: 645 },
  { month: "Dec", revenue: 98, orders: 702 },
];

export const categoryShare = [
  { name: "Electronics", value: 38 },
  { name: "Apparel", value: 27 },
  { name: "Grocery", value: 21 },
  { name: "Home", value: 14 },
];

export const timeline = [
  {
    period: "Mar 2026 — Sep 2026",
    title: "MIS Executive",
    org: "Prakash Herbal · Sojat, Rajasthan",
    points: [
      "Prepared and maintained MIS reports on sales orders and inventory for day-to-day management review.",
      "Built Excel dashboards monitoring stock levels and inventory movement with formulas and structured formatting.",
      "Processed and tracked sales orders end to end, keeping records accurate, consistent and retrievable.",
    ],
  },
  {
    period: "2023 — 2026",
    title: "Bachelor of Computer Applications",
    org: "Manipal University Jaipur",
    points: [
      "Specialisation in Data Analytics with Financial & Accounting Management.",
      "Final-year project: Stock Market Analysis & Visualization dashboard, defended in viva.",
    ],
  },
  {
    period: "Certifications",
    title: "Continuous Learning",
    org: "Tata · HP LIFE · IBM",
    points: [
      "Tata — GenAI-Powered Data Analytics Job Simulation (Forage).",
      "HP LIFE — Data Science and Analytics.",
      "IBM — GenAI: Prompt Engineering Basics.",
    ],
  },
];

export const marqueeItems = [
  "Data Analyst",
  "SQL",
  "Power BI",
  "Advanced Excel",
  "Python",
  "Business Intelligence",
  "Data Storytelling",
  "KPI Reporting",
];
