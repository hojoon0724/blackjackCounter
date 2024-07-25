import { GameContext } from '../../pages/home';
import { useContext } from 'react';
import { InGameActions, AskInsurance, Deal } from './handActionButtons';

export default function BottomBarActionsContainer() {
  const { gameInProgress, askInsurance } = useContext(GameContext);

  if (gameInProgress && !askInsurance) {
    return <InGameActions />;
  } else if (askInsurance) {
    return <AskInsurance />;
  } else {
    return <Deal />;
  }
}
