import { executeHooksWithArgs } from 'wdio-sync'

const CUCUMBER_EVENTS = [
    'handleBeforeFeatureEvent', 'handleAfterFeatureEvent',
    'handleBeforeScenarioEvent', 'handleAfterScenarioEvent',
    'handleBeforeStepEvent', 'handleStepResultEvent'
]

class HookRunner {
    constructor (BaseListener, config) {
        this.listener = BaseListener

        this.beforeFeature = config.beforeFeature
        this.beforeScenario = config.beforeScenario
        this.beforeStep = config.beforeStep
        this.afterFeature = config.afterFeature
        this.afterScenario = config.afterScenario
        this.afterStep = config.afterStep

        for (const fnName of CUCUMBER_EVENTS) {
            this.listener[fnName] = HookRunner.prototype[fnName].bind(this)
        }
    }

    getListener () {
        return this.listener
    }

    handleBeforeFeatureEvent (feature) {
        return executeHooksWithArgs(this.beforeFeature, [feature]).catch((e) => {
            console.error(`beforeFeature has thrown an error: ${e}`)
        })
    }

    handleBeforeScenarioEvent (scenario) {
        return executeHooksWithArgs(this.beforeScenario, [scenario]).catch((e) => {
            console.error(`beforeScenario has thrown an error: ${e}`)
        })
    }

    handleBeforeStepEvent (step) {
        return executeHooksWithArgs(this.beforeStep, [step]).catch((e) => {
            console.error(`beforeStep has thrown an error: ${e}`)
        })
    }

    handleStepResultEvent (stepResult) {
        return executeHooksWithArgs(this.afterStep, [stepResult]).catch((e) => {
            console.error(`afterStep has thrown an error: ${e}`)
        })
    }

    handleAfterScenarioEvent (scenario) {
        return executeHooksWithArgs(this.afterScenario, [scenario]).catch((e) => {
            console.error(`afterScenario has thrown an error: ${e}`)
        })
    }

    handleAfterFeatureEvent (feature) {
        return executeHooksWithArgs(this.afterFeature, [feature]).catch((e) => {
            console.error(`afterFeature has thrown an error: ${e}`)
        })
    }
}

export default HookRunner
