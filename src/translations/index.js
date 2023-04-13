import menuTranslations from './translationsFiles/menuTranslations';
import userSettingsTranslations from './translationsFiles/userSettingsTranslations';
import commonComponents from './translationsFiles/commonComponents';
import users from './translationsFiles/users';
import vehicles from './translationsFiles/vehicles';
import workPoints from './translationsFiles/workPoints';
import clientSource from './translationsFiles/clientSource';
import dashboard from './translationsFiles/dashboard';
import clients from './translationsFiles/clients';
import profile from './translationsFiles/profile';
import offers from './translationsFiles/offers';
import utilsTranslations from './translationsFiles/utilsTranslations';
import objectives from './translationsFiles/objectives';
import tasksTranslation from './translationsFiles/tasksTranslation';
import version from './translationsFiles/version';
import support from './translationsFiles/support';

const translation = {
    ...menuTranslations.ro,
    ...commonComponents.ro,
    ...users.ro,
    ...vehicles.ro,
    ...userSettingsTranslations.ro,
    ...workPoints.ro,
    ...clientSource.ro,
    ...dashboard.ro,
    ...clients.ro,
    ...profile.ro,
    ...offers.ro,
    ...utilsTranslations.ro,
    ...objectives.ro,
    ...tasksTranslation.ro,
    ...version.ro,
    ...support.ro,
};

export default translation;
