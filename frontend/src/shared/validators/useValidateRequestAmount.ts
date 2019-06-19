import React from 'react';

import { tKeys } from 'services/i18n';
import { DaoApi } from 'services/daoApi';
import { useUserBalance } from 'shared/helpers/user';
import { useActiveWithdraws } from 'shared/helpers/voting';

export function useValidateRequestAmount(daoApi: DaoApi) {
  const userBalance = useUserBalance(daoApi);
  const currentWithdrawAmount = useActiveWithdraws(daoApi);

  return React.useCallback((daiAmount: number) => {
    const remainedDai = userBalance - currentWithdrawAmount;

    return remainedDai >= daiAmount ? undefined : tKeys.shared.validation.notEnoughDai.getKey();
  }, [currentWithdrawAmount, userBalance]);
}
