

<script>
	import { enhance } from '$app/forms';
	import { updated } from '$app/state';
	import { upload } from '@vercel/blob/client';
	import { UserPen } from 'lucide-svelte';
	import { Settings } from 'lucide-svelte';
	import { ShieldCheck } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { User } from 'lucide-svelte';
	import { ChevronRight } from 'lucide-svelte';
	import { BookHeart,Lock,Bell,LogOut,Star,MapPinned,Phone,Calendar  } from 'lucide-svelte';






	let { data,form } = $props();
</script>




{#if !data.user}
    <div class="flex justify-center items-center h-70">
        <p>You need a account</p>
    </div>
{:else}

<section class="min-h-50 bg-teal-700 flex items-center justify-between ">

	<div class="flex flex-row gap-6 ml-20 text-white" in:fly={{ y: 20, duration: 800, delay: 200 }} >
		<div>

			<img src={data.user.image} alt="" class=" h-30 w-30 bg-cover rounded-full" >

		</div>
		<div class="mt-7">
			<h1 class="font-extrabold text-2xl" >{data.user.username}</h1>
			<p class="font-light" >{data.user.email}</p>
			<div class="flex flex-row gap-1 rounded-2xl text-center justify-center items-center bg-teal-600 p-1 mt-2">
				<ShieldCheck />
			    <p class="font-bold">Verified Account</p>
			</div>
			
		</div>
	</div>

	<div class="text-white" in:fly={{ y: 20, duration: 800, delay: 200 }} >
		<div class="flex flex-row gap-4 justify-center items-center mr-30 font-bold">

			<div class="flex flex-row gap-2 bg-teal-600 rounded-xl p-2">
				<UserPen/>
				<a href="/profilePhoto">Edit Profile</a>
			</div>
			<div class="flex flex-row gap-2 bg-teal-600 rounded-xl p-2">
				<Settings/>
				<a href="/setting">Settings</a>
			</div>

		</div>
	</div>

</section>



<main class="flex flex-row gap-10 w-[100%]"> 


<section class="flex flex-col gap-7 m-10">

	<div class="flex flex-col gap-10 shadow-2xl p-8 rounded-2xl">
		<div class="flex flex-row justify-between items-center">
			<div class="flex gap-3 flex-row">
				<User />
				<p>Profile</p>
			</div>
			<div>
				<ChevronRight />
			</div>

		</div>

		<div class="flex flex-row justify-between items-center">
			<div class="flex gap-3 flex-row">
				<Lock />
				<p>Security</p>
			</div>
			<div>
				<ChevronRight />
			</div>

		</div>

		<div class="flex flex-row justify-between items-center">
			<div class="flex gap-3 flex-row">
				<Bell />
				<p>Notification</p>
			</div>
			<div>
				<ChevronRight />
			</div>

		</div>

		<div class="flex flex-row justify-between items-center">
			<div class="flex gap-3 flex-row">
				<LogOut />
				<p>Sign out</p>
			</div>
			<div>
				<ChevronRight />
			</div>

		</div>

		

	</div>


	<div class="bg-white shadow-2xl gap-2 rounded-2xl p-10 w-100 flex flex-col justify-between">
		<p class="font-bold">Account Stats</p>
		<div class="flex flex-row gap-3 ">
			<div class="flex flex-col gap-2 bg-green-200 p-3 justify-center items-center w-40 rounded-2xl">
				<BookHeart size="40" class="text-green-800 bg-green-300 p-2 rounded-full" />
				<p class="font-bold text-2xl">42</p>
				<p class="font-light">Favourites</p>
			</div>
			<div class="flex flex-col gap-2 bg-indigo-100 p-3 justify-between items-center w-40 rounded-2xl">
				<Star size="40" class="text-green-800 bg-indigo-200 p-2 rounded-full"  />
				<p class="font-bold text-2xl">123</p>
				<p class="font-light">Points</p>
			</div>
		</div>
	</div>

</section>




	<form action="?/changeInfo" method="POST" class="bg-white w-[100%] gap-4 m-10  shadow-2xl flex flex-col rounded-2xl p-6 justify-center items-center">

		<p class="font-bold text-3xl mb-5">Personal informationen</p>

	<div class="flex flex-row gap-6 w-[100%]">
		<div class="flex flex-col justify-between gap-1 w-[50%]">
			<h1 class="font-bold">Username</h1>
			<p class="p-2 bg-gray-100 rounded border-gray-400 border-1 shadow font-light">{data.user.username}</p>
		</div>
		<div class="flex flex-col justify-between gap-1 w-[50%]">
			<h1 class="font-bold">Email</h1>
			<p class=" p-2 bg-gray-100 rounded border-gray-400 border-1 shadow font-light">{data.user.email}</p>
		</div>
	</div>

	<input type="hidden" value={data.user.id} name="userID">

	<div class="flex gap-1 flex-col w-[100%]">
		<p class="font-bold">Bio</p>
		<textarea
  name="bio"
  class="bg-gray-100 rounded border border-gray-400 shadow font-light relative text-left"
>
  {data.user.bio}
</textarea>

	</div>

	<div class="flex flex-row gap-6 justify-between w-[100%]">
		<div class="w-[50%] flex flex-col gap-1">
			<p class="font-bold">Location</p>
		    <div class="flex flex-row bg-gray-100 rounded border-gray-400 border-1 shadow font-light p-2 gap-2">
			   <MapPinned />
			  <p>Berlin,Germany</p>

		    </div>

		</div>
		<div class="w-[50%] flex flex-col gap-1">
			<p class="font-bold">Phone</p>
			<div class="flex flex-row bg-gray-100 rounded border-gray-400 border-1 shadow font-light p-2 gap-2">
				<Phone />
				<p>+355 69 542 3977</p>

			</div>
		</div>
		
	</div>

	<div class="flex flex-col gap-1 w-[100%]">
		<h1 class="font-bold">Member since</h1>
		<div class="flex flex-row w-[100%] bg-gray-100 rounded border-gray-400 border-1 shadow font-light p-2 gap-2">
			<Calendar />
			<p>{data.user.created_at}</p>

		</div>

	</div>

	<button type="submit" class="relative right-93 bg-teal-500 px-5 rounded text-white shadow-2xl mt-10 hover:bg-teal-600 transition-all duration-300 hover:scale-105">Save</button>

</form>





</main>

{/if}






