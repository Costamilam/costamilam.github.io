<script>
    import { auth, persistence, googleProvider, database, messaging } from './firebase';

	let deviceToken = null;

	let message = [];

	let error = [];

	const copy = () => navigator.clipboard.writeText(deviceToken);

	const updateToken = () => messaging.getToken()
		.then(token => deviceToken = token)
		.then(token => database.ref('/receiver').set(token))
		.catch(console.error)

	const load = () => {
		database.ref('/messages').on('value', snapshot => {
			message = [];

			const data = snapshot.val();

			for (const key in data) {
				message.push(data[key]);
			}
		});
		
		database.ref('/errors').on('value', snapshot => {
			error = [];

			const data = snapshot.val();

			for (const key in data) {
				error.push({
					error: data[key].error,
					values: JSON.stringify(data[key].values)
				});
			}
		});
	}

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
	{#each error as item}
		<div class="danger">
			<h1>{ item.error }</h1>

			<pre>{ item.values }</pre>
		</div>
	{/each}

	{#each message as item}
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
