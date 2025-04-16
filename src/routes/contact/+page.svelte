<script>
	import { fly } from 'svelte/transition';
	import { Mail, Phone, MapPin, Clock, Send, Building2, Users } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	
	let {data,form} = $props();
</script>



<div class="min-h-screen">

	<section class="relative  py-20 bg-green-600 rounded ">
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h1
					class="text-4xl font-bold  text-white sm:text-5xl md:text-6xl"
					in:fly={{ y: 20, duration: 800 }}
				>
					Get in Touch
				</h1>
				<p
					class="mx-auto mt-6 max-w-2xl text-lg text-white "
					in:fly={{ y: 20, duration: 800, delay: 200 }}
				>
					Have questions or need assistance? We're here to help. Reach out to us through any of the
					following channels.
				</p>
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

				<div class="group rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl" in:fly={{ y: 20, duration: 800, delay: 300 }}>
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white">
						<Mail class="h-6 w-6" />
					</div>
					<h3 class="mt-4 text-lg font-semibold text-gray-900">Email Us</h3>
					<p class="mt-2 text-gray-600">ErgBeq@htl-shkoder.com</p>
				</div>


				<div class="group rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl" in:fly={{ y: 20, duration: 800, delay: 400 }}>
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white">
						<Phone class="h-6 w-6" />
					</div>
					<h3 class="mt-4 text-lg font-semibold text-gray-900">Call Us</h3>
					<p class="mt-2 text-gray-600">+355 69 542 3977</p>
				</div>


				<div class="group rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl" in:fly={{ y: 20, duration: 800, delay: 500 }}>

					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white">
						<MapPin class="h-6 w-6" />
					</div>

					<h3 class="mt-4 text-lg font-semibold text-gray-900">Visit Us</h3>
					<p class="mt-2 text-gray-600">Shkoder, Albania</p>
				</div>


				<div class="group rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl" in:fly={{ y: 20, duration: 800, delay: 600 }}>
					<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
						<Clock class="h-6 w-6" />
					</div>
					<h3 class="mt-4 text-lg font-semibold text-gray-900">Business Hours</h3>
					<p class="mt-2 text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
				</div>
			
			</div>
		</div>
	</section>


	<section class="py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">

				<div
					class="rounded-2xl bg-white p-8 shadow-lg"
					in:fly={{ x: -20, duration: 800, delay: 700 }}
				>
					<h2 class="text-2xl font-bold text-gray-900">Send us a Message</h2>
					<p class="mt-2 text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>


					<form action="?/contact" class="mt-8 space-y-6" method="POST">
						
						<input
								type="hidden"
								name="username"
								value={data.user.username}

							/>

						<div>
							<label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
							<input
								type="text"
								name="topic"
								required
								class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm"
								placeholder="What's this about?"
							/>
						</div>

						<div>
							<label for="message" class="block text-sm font-medium text-gray-700">Message</label>
							<textarea
								required
								rows="4"
								name="text"
								class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm"
								placeholder="Your message..."
							></textarea>
						</div>

						<button
							class="group relative flex w-full items-center bg-green-600 justify-center rounded-lg  px-6 py-3 text-sm font-semibold text-white cursor-pointer  ">
								<span class="mr-1">Send Message</span><Send size="20" />
								
						</button>
					</form>


				</div>


				<div class="space-y-8" in:fly={{ x: 20, duration: 800, delay: 700 }}>

					<div class="rounded-2xl bg-white p-8 shadow-lg">
						<div class="flex items-center gap-4">
							<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
								<Building2 class="h-6 w-6" />
							</div>
							<div>
								<h3 class="text-lg font-semibold text-gray-900">Company Information</h3>
								<p class="mt-1 text-gray-600">Learn more about our company and mission.</p>
							</div>
						</div>
						<div class="mt-6 space-y-4 text-gray-600">
							<p>We are dedicated to providing the best service to our customers.</p>
							<p>Our team of experts is always ready to help you with any questions or concerns.</p>
						</div>
					</div>


					<div class="rounded-2xl bg-white p-8 shadow-lg">
						<div class="flex items-center gap-4">
							<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
								<Users class="h-6 w-6" />
							</div>
							<div>
								<h3 class="text-lg font-semibold text-gray-900">Our Team</h3>
								<p class="mt-1 text-gray-600">Meet the people behind our success.</p>
							</div>
						</div>
						<div class="mt-6 space-y-4 text-gray-600">
							<p>Our team consists of experienced professionals who are passionate about what they do.</p>
							<p>We work together to ensure the best possible experience for our customers.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>



