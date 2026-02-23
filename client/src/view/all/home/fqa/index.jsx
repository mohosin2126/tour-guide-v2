import Accordion from '../../../../components/reuseable/accordion/index.jsx'
import Title from '../../../../Components/reuseable/title/inex.jsx';

export default function FQAPage() {
  const questions = [
    {
      title: "Sign Up and Onboard",
      content: "Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.",
    },
    {
      title: "Recruit Affiliates",
      content: "Launch your advertising campaigns across various channels. Whether you're focusing on display ads, social media, or search, Affity supports all major advertising platforms.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.",
    },
    {
      title: "Track and Optimize",
      content: "Monitor your campaigns in real-time and use our advanced analytics to optimize performance. Make data-driven decisions to enhance your ROI.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.",
    },
    {
      title: "Scale Your Efforts",
      content: "As you refine your strategy, scale your campaigns to reach a larger audience. Affity provides the tools you need to grow your advertising efforts successfully.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.",
    },
    {
      title: "How to Create Tourism",
      content: "Launch your advertising campaigns across various channels. Whether you're focusing on display ads, social media, or search, Affity supports all major advertising platforms.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.",
    },
  ];
  return (
    <div className='flex items-center justify-center flex-col gap-2 mt-12'>
      <Title title="FAQ" subTitle="Frequently Asked Questions" className="text-center" />
      <div className='w-full lg:w-1/2 '>
        <Accordion questions={questions} />
      </div>
    </div>
  )
}
