<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 col-md-8 px-0 mb-4" tabindex="0">
			<form role="form" class="mailjet-settings">
				<div class="mb-4">
					<!--<h5 class="fw-bold tracking-tight settings-header">General</h5>-->

					<p class="lead">To get started:</p>
					<p>
						Register for an account on <a href="https://app.mailjet.com/signup" target="_blank">https://app.mailjet.com/signup</a>. Mailjet offers a free tier with up to 6,000 free emails monthly.
					</p>
					<p>
						Paste your API key and SECRET key into the fields below, hit save, and restart your NodeBB
					</p>
					<div class="mb-3">
						<label class="form-label" for="apiKey">API Key</label>
						<input type="text" id="apiKey" name="apiKey" title="API Key" class="form-control" placeholder="API Key">
					</div>
					<div class="mb-3">
						<label class="form-label" for="secretKey">Secret Key</label>
						<input type="text" id="secretKey" name="secretKey" title="Secret Key" class="form-control" placeholder="Secret Key">
					</div>
				</div>
			</form>
		</div>

		<!-- IMPORT admin/partials/settings/toc.tpl -->
	</div>
</div>