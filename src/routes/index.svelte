<script type="ts">
  import { imask } from "@imask/svelte";
  import { fly } from "svelte/transition";

  let value = "";
  let posting = false;

  type Address = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
  };

  let address: Address | undefined;

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (value.length < 9) {
      alert("Preencha o CEP corretamente.");
      return false;
    }

    address = undefined;
    posting = true;
    const response = await fetch(`/api/viacep/${value.replace(/-/gi, "")}`);
    posting = false;
    const data = await response.json();
    address = data;
  };
</script>

<main>
  <header>
    <h1>Consulta de endereço</h1>
  </header>
  <form method="POST" action="/api/viacep" on:submit={handleSubmit}>
    <h2>Consultar</h2>
    <label for="cep">CEP</label>
    <input
      disabled={posting}
      name="cep"
      id="cep"
      use:imask={{ mask: "00000-000", lazy: true }}
      bind:value
      required
    />
    <button disabled={posting}>Buscar</button>
    {#if posting}
      <p
        style:display="inline-block"
        style:margin="0"
        style:padding="0"
        in:fly={{ x: -100, opacity: 1 }}
        out:fly={{ x: 100, opacity: 0 }}
      >
        Buscando...
      </p>
    {/if}
  </form>

  {#if address}
    <section in:fly={{ x: -100, opacity: 1 }} out:fly={{ x: 100, opacity: 0 }} class="result">
      <h3>
        {address.logradouro}
        {address.complemento}
        <button on:click={() => (address = undefined)}>&times;</button>
      </h3>
      <p>{address.bairro}</p>
      <p>{address.localidade} - {address.uf}</p>
      <p>{address.cep}</p>
      <iframe
        src={`http://maps.google.com/maps?q=${address.cep}&z=15&output=embed`}
        width="100%"
        height="370"
        title="mapa"
        frameBorder="0"
      />
    </section>
  {/if}
</main>
