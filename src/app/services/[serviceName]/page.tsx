import { Metadata } from 'next';

type Props = {
    params: {
      serviceName: String;
    };
  };

// Metadata function
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceName } = params;  
  return {
    title: `${serviceName}`, 
  };
}

// Page Component
export default function Service({ params }: Props) {
  const { serviceName } = params; 

  return (
    <div>
      <h1>Welcome to the {serviceName} service</h1>
    </div>
  );
}
