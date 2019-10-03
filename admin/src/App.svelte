<script>
    import { auth, persistence, googleProvider, database, messaging } from './firebase';

	let deviceToken = null;

	let list = [];

	const copy = () => navigator.clipboard.writeText(deviceToken);

	const updateToken = () => messaging.getToken()
		.then(token => {
			deviceToken = token;

			database.ref('/receiver').set(token);
		})
		.catch(console.error)

	const load = () => database.ref('/messages').on('value', snapshot => {
		list = [];

		const data = snapshot.val();

		for (const key in data) {
			list.push(data[key]);
		}
	});

	auth.onAuthStateChanged(user => {
		if (!user) {
			auth.setPersistence(persistence.LOCAL)
				.then(() => auth.signInWithPopup(googleProvider)
					.then(user => user = user)
					.then(load)
					.catch(console.error))
				.catch(console.error);
		} else {
			load();
		}
	});

	messaging.requestPermission()
		.then(updateToken)
		.catch(console.error);

	messaging.onTokenRefresh(updateToken);
</script>

<main>
	{#each list as item}
		<div>
			<h1>{ item.name }</h1>

			<p>{ new Date(item.date).toLocaleString() }</p>

			{#if item.phone}
				<p>{ item.phone }</p>
			{/if}

			{#if item.email}
				<p>{ item.email }</p>
			{/if}

			<p>{ item.message }</p>
		</div>
	{/each}
</main>

<footer on:click={copy}>{ deviceToken }</footer>
