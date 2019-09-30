export function setMainRoutes (mainComponent, resolver, prefix) {
	const router = resolver.resolve('Router')
	router.addRoutes(prefix, [
		{
			path: '',
			action: async () => {
				return router.navigate('/base/accordion')
			}
		},
		{
			path: 'base',
			action: async () => {
				const module = await import('./base/index.js')
				const _prefix = prefix + 'base/'
				setMainComponent(mainComponent, module.hub(resolver, _prefix))
			}
		}
	])
}

function setMainComponent (mainComponent, screenComponent) {
	mainComponent.parentElement.replaceChild(screenComponent, mainComponent)
}
