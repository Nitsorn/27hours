import { useMemo } from "react";
import type { SupportedPlatform } from ".";

export const usePlatform = () => {
  const platform: SupportedPlatform = useMemo(() => {
    switch (true) {
      case window.location.href.includes('jira'):
        return 'jira';
      case window.location.href.includes('retool'):
        return 'retool';
      default:
        return 'unsupported';
    }
  }, [
    window.location.href,
  ])

  console.log('platform', platform);
  
  return {
    platform,
  }
}