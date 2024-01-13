import React from 'react';

export interface ProvidersComposerProps {
  providers: React.FC<{ children: React.ReactNode }>[];
  children: React.ReactNode;
}

const compose = (providers: React.FC<{ children: React.ReactNode }>[]) =>
  providers.reduce((Prev, Curr) => ({ children }) => {
    const Provider = Prev ? (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    ) : (
      <Curr>{children}</Curr>
    );
    return Provider;
  });

export const ProvidersComposer: React.FC<ProvidersComposerProps> = ({
  providers,
  children
}): React.ReactNode => {
  if (!providers?.length) return children;

  const Providers = compose(providers);
  return <Providers>{children}</Providers>;
};

export default ProvidersComposer;
