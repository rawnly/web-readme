#!/usr/bin/env node

const {
	makeScreenshot
} = require( './lib/util' )
const puppeteer = require( 'puppeteer' )
const path = require( 'path' )
const fs = require( 'fs/promises' )
const signale = require( 'signale' )

// Declare async main function
async function main() {
	signale.pending( "Launching..." )

	try {
		// launch browser
		const browser = await puppeteer.launch( {
			args: [ '--no-sandbox' ],
			headless: true,
			// devtools: true,
		} )

		const page = await browser.newPage()

		signale.pending( "Reading configuration..." )
		const template = await fs.readFile( path.resolve( __dirname, '../templates/README.template.md' ), 'utf-8' )
		const configurationJson = await fs.readFile( 'readme.config.json', 'utf-8' )
		const project = JSON.parse( configurationJson )

		await page.goto( project.url )

		signale.pending( "Taking a screenshot" )
		await makeScreenshot( page, 'screenshot.png' )
		signale.success( "Screenshot taken." )


		const filecontent = Object
			.keys( project )
			.reduce( ( acc, key ) =>
				acc
				.replace(
					new RegExp( `{{project.${key}}}`, 'g' ),
					project[ key ]
				), template )

		await fs.writeFile( 'README.md', filecontent, 'utf-8' )

		signale.success( "Operation Completed!" )
		await page.close()
		await browser.close()
	} catch ( error ) {
		signale.fatal( error )
	}
}


main();
