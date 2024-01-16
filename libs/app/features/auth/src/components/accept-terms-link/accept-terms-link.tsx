import { Theme, useStyle } from '@zix/app/ui/core';
import { TextLink } from 'solito/link';

import { t } from 'i18next';

/**
 * Renders a link to accept the terms and conditions.
 * @returns The rendered AcceptTermsLink component.
 */
export const AcceptTermsLink: React.FC = () => {
  return (
    <Theme inverse>
      <TextLink
        href={`/terms-conditions`}
        textProps={{
          style: useStyle({
            color: '$color5'
          })
        }}
      >
        {t('auth:terms_and_conditions')}
      </TextLink>
    </Theme>
  );
};

export default AcceptTermsLink;
