import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Colors, Typography } from 'react-native-ui-lib';
import { Amplify } from 'aws-amplify';
import awsconfig from '@/awsConfig';
import { AppNavigator } from '@/navigation';
import { COLORS, TYPOGRAPHIES } from '@/constants';

Amplify.configure(awsconfig);

export default function App() {
  Colors.loadColors(COLORS);

  Typography.loadTypographies(TYPOGRAPHIES);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
};
