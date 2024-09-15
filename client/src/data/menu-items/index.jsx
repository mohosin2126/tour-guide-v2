import { FaUser } from "react-icons/fa";
import { MdReport, MdSentimentSatisfied, MdSettings, MdSupport } from "react-icons/md";







// for home page navbar 
const menuData = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Community", href: "/community" },
    { id: 3, title: "Blogs", href: "/blogs" },
    {
      id: 4,
      title: "Services",
      subMenu: [
        { title: "Content 1", href: "/services/content1" },
        { title: "Content 2", href: "/services/content2" },
      ],
    },
    { id: 5, title: "Contact Us", href: "/contact" },
  ];


//   for dashboard  all navigation data 

const dashboardData = [
    { 
      id: 1, 
      title: "Overview", 
      href: "/", 
      icon: MdSentimentSatisfied  
    },
    { 
      id: 2, 
      title: "Users", 
      href: "/users", 
      icon: FaUser  
    },
    { 
      id: 3, 
      title: "Reports", 
      href: "/reports", 
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
      href: "/settings", 
      icon: MdSettings, 
      subMenu: [
        { 
          title: "Profile Settings", 
          href: "/settings/profile", 
        },
        { 
          title: "Security", 
          href: "/settings/security", 
        },
        { 
          title: "Notifications", 
          href: "/settings/notifications", 
        },
      ],
    },
    { 
      id: 5, 
      title: "Help & Support", 
      href: "/help", 
      icon: MdSupport
    },
  ];
  
  
  
  // Export the all data
  export { menuData,dashboardData };
  

