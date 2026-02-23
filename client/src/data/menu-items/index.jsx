import { FaUser } from "react-icons/fa";
import { MdReport, MdSentimentSatisfied, MdSettings, MdSupport } from "react-icons/md";



// for home page navbar 
const menuData = [
    { id: 1, title: "Home", href: "/" },
    { id: 1, title: "About Us", href: "/about-us" },
    { id: 2, title: "Community", href: "/community" },
    { id: 3, title: "Blogs", href: "/blogs" },
    {
      id: 4,
      title: "Services",
      subMenu: [
        { title: "Content 1", href: "/services/content1" },
        { title: "Content 2", href: "/services/content2" },
        { title: "Content 3", href: "/services/content3" },
        { title: "Content 4", href: "/services/content4" },
        { title: "Content 5", href: "/services/content5" },
        { title: "Content 6", href: "/services/content6" },
      ],
    },
    { id: 5, title: "Contact Us", href: "/contact-us" },
  ];


//   for dashboard  all navigation data 

const dashboardData = [
    { 
      id: 1, 
      title: "Overview", 
      href: "/admin/overview",  
      icon: MdSentimentSatisfied  
    },
    { 
      id: 2, 
      title: "Users", 
      href: "/admin/users", 
      icon: FaUser  
    },
    { 
      id: 3, 
      title: "Reports", 
      href: "/admin/reports", 
      icon: MdReport,
      subMenu: [
        { 
          title: "Performance", 
          href: "/admin/reports/performance", 
        },
        { 
          title: "Conversion", 
          href: "/admin/reports/conversion", 
        },
        { 
          title: "Conversion Logs", 
          href: "/admin/reports/conversion-logs", 
        },
        { 
          title: "Click Logs", 
          href: "/admin/reports/click-logs", 
        },
      ],
    },
    { 
      id: 4, 
      title: "Settings", 
      href: "/admin/settings", 
      icon: MdSettings, 
      // subMenu: [
      //   { 
      //     title: "Profile Settings", 
      //     href: "/admin/settings/profile", 
      //   },
      //   { 
      //     title: "Security", 
      //     href: "/admin/settings/security", 
      //   },
      //   { 
      //     title: "Notifications", 
      //     href: "/admin/settings/notifications", 
      //   },
      // ],
    },
    { 
      id: 5, 
      title: "Help & Support", 
      href: "/admin/help", 
      icon: MdSupport
    },
  ];
  
  const settingsData = [
    {
      id: 1,
      title: "Profile Settings",
      href: "/admin/settings/profile",
      icon: MdSentimentSatisfied  
    },
    {
      id: 2,
      title: "Security",
      href: "/admin/settings/security",
      icon: MdSentimentSatisfied  
    },
    {
      id: 3,
      title: "Notifications",
      href: "/admin/settings/notifications",
      icon: MdSentimentSatisfied  
    },

  ]
  
  
  // Export the all data
  export { menuData,dashboardData,settingsData };
  

