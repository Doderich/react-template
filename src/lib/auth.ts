import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
	url: import.meta.env.VITE_KC_URL,
	realm: import.meta.env.VITE_KC_REALM,
	clientId: import.meta.env.VITE_KC_CLIENT,
});

const getRoleCollectionOfUser = () =>
	keycloak.tokenParsed?.resource_access?.['proftime-login']?.roles ?? [];
const logout = () => keycloak.logout();

export { keycloak, getRoleCollectionOfUser, logout };
