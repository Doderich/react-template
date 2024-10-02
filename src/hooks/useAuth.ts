import { keycloak } from '@/lib/auth';
import { useEffect, useRef, useState } from 'react';
import { useSessionStorage } from '@uidotdev/usehooks';

const useAuth = () => {
	const hasRun = useRef(false);
	const [authenticated, setAuthenticated] = useState(false);
	const [token, setToken] = useSessionStorage<string | null>('token', null);

	useEffect(() => {
		if (hasRun.current) return;
		hasRun.current = true;

		keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
			setAuthenticated(authenticated);
			authenticated ? setToken(keycloak.token) : keycloak.login();
		});
	}, []);

	return authenticated;
};

export { useAuth };
