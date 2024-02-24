import { Forklift, PackageOpen, Sparkles, Users } from '@tamagui/lucide-icons';
import {
  Onboarding,
  OnboardingStepContent,
  OnboardingStepInfo,
} from '@zix/ui/widgets';
import { useRouter } from 'solito/router';

const steps: OnboardingStepInfo[] = [
  {
    theme: 'yellow',
    Content: () => (
      <OnboardingStepContent
        title="Join & Create Profile"
        icon={Sparkles}
        description="Set up your account effortlessly and showcase your transport expertise."
      />
    ),
  },
  {
    theme: 'orange',
    Content: () => (
      <OnboardingStepContent
        title="Discover Shipments"
        icon={PackageOpen}
        description="Browse customer requests, find lucrative shipments, and start bidding."
      />
    ),
  },
  {
    theme: 'green',
    Content: () => (
      <OnboardingStepContent
        title="Build Your Team"
        icon={Users}
        description="Invite managers and drivers to streamline your logistics operations."
      />
    ),
  },
  {
    theme: 'purple',
    Content: () => (
      <OnboardingStepContent
        title="Effortless Vehicle Management"
        icon={Forklift}
        description="Manage and track your fleet seamlessly for optimal efficiency."
      />
    ),
  },
];

/**
 * note: this screen is used as a standalone page on native and as a sidebar on auth layout on web
 */
export const OnboardingScreen = () => {
  const router = useRouter();
  return (
    <Onboarding
      autoSwipe
      onOnboarded={() => router.push('/auth/register')}
      steps={steps}
    />
  );
};

export default OnboardingScreen;
