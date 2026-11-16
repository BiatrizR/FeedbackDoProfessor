const SUPABASE_URL = "https://zeplfnncrptgjdiolklw.supabase.co";

const SUPABASE_KEY = "sb_publishable_hp7yREo91s3ls5rCa3pQHg_lvWAnyue";

const db = window.supabase.createClient(
	SUPABASE_URL,
	SUPABASE_KEY
);


// ======================================
// CONFIGURAÇÕES
// ======================================

const formFeedback = document.getElementById("formFeedback");

const btnAdicionarLink = document.getElementById("btnAdicionarLink");

const btnAdicionarImagem = document.getElementById("btnAdicionarImagem");

const seletorImagem = document.getElementById("seletorImagem");

const modalLink = document.getElementById("modalLink");

const formLink = document.getElementById("formLink");

const linksAdicionados = document.getElementById("linksAdicionados");

const imagensAdicionadas = document.getElementById("imagensAdicionadas");

const contadorImagens = document.getElementById("contadorImagens");


// ======================================
// ARMAZENAMENTO TEMPORÁRIO
// ======================================

let links = [];

let imagens = [];

// ======================================
// SISTEMA DE ESTRELAS CUMULATIVAS
// ======================================

const gruposEstrelas = document.querySelectorAll(".estrelas");

gruposEstrelas.forEach((grupo) => {

	const estrelas = grupo.querySelectorAll('input[type="radio"]');

	estrelas.forEach((estrela) => {

		estrela.addEventListener("change", () => {

			const valorSelecionado = Number(estrela.value);

			estrelas.forEach((item) => {

				const valor = Number(item.value);

				if (valor <= valorSelecionado) {
					item.classList.add("selecionada");
				} else {
					item.classList.remove("selecionada");
				}

			});

		});

	});

});


// ======================================
// ADICIONAR LINK
// ======================================

btnAdicionarLink.addEventListener("click", () => {

	document.getElementById("novoLink").value = "";

	modalLink.showModal();

});


// SALVAR LINK

formLink.addEventListener("submit", (event) => {

	event.preventDefault();

	const campoLink = document.getElementById("novoLink");

	const endereco = campoLink.value.trim();

	try {

		const url = new URL(endereco);

		if (!["http:", "https:"].includes(url.protocol)) {
			alert("Utilize um link HTTP ou HTTPS válido.");
			return;
		}

	} catch {
		alert("Digite um link válido.");
		return;
	}

	links.push(endereco);

	atualizarLinks();

	modalLink.close();

});


// CANCELAR LINK

document.getElementById("btnCancelarLink").addEventListener("click", () => {

	modalLink.close();

});


// ======================================
// MOSTRAR LINKS
// ======================================

function atualizarLinks() {

	linksAdicionados.innerHTML = "";

	links.forEach((link, index) => {

		const container = document.createElement("div");

		container.className = "link-item";

		const endereco = document.createElement("a");

		endereco.href = link;

		endereco.target = "_blank";

		endereco.rel = "noopener noreferrer";

		endereco.textContent = link;

		const remover = document.createElement("button");

		remover.type = "button";

		remover.textContent = "Remover";

		remover.addEventListener("click", () => {

			links.splice(index, 1);

			atualizarLinks();

		});

		container.appendChild(endereco);

		container.appendChild(remover);

		linksAdicionados.appendChild(container);

	});

}


// ======================================
// ADICIONAR IMAGENS
// ======================================

btnAdicionarImagem.addEventListener("click", () => {

	seletorImagem.click();

});


seletorImagem.addEventListener("change", (event) => {

	const arquivos = Array.from(event.target.files);

	if (imagens.length + arquivos.length > 5) {

		alert("Você pode adicionar no máximo 5 imagens.");

		event.target.value = "";

		return;

	}

	const arquivosValidos = arquivos.filter((arquivo) => {

		if (!arquivo.type.startsWith("image/")) {
			alert("Selecione somente imagens.");
			return false;
		}

		if (arquivo.size > 5 * 1024 * 1024) {
			alert("Cada imagem deve ter no máximo 5 MB.");
			return false;
		}

		return true;

	});

	imagens.push(...arquivosValidos);

	atualizarImagens();

	event.target.value = "";

});


// ======================================
// MOSTRAR IMAGENS
// ======================================

function atualizarImagens() {

	imagensAdicionadas.innerHTML = "";

	contadorImagens.textContent =
		`${imagens.length} de 5 imagens adicionadas`;

	imagens.forEach((imagem, index) => {

		const container = document.createElement("div");

		container.className = "imagem-item";

		const preview = document.createElement("img");

		preview.src = URL.createObjectURL(imagem);

		preview.alt = imagem.name;

		const nome = document.createElement("p");

		nome.textContent = imagem.name;

		const remover = document.createElement("button");

		remover.type = "button";

		remover.textContent = "Remover imagem";

		remover.addEventListener("click", () => {

			URL.revokeObjectURL(preview.src);

			imagens.splice(index, 1);

			atualizarImagens();

		});

		container.appendChild(preview);

		container.appendChild(nome);

		container.appendChild(remover);

		imagensAdicionadas.appendChild(container);

	});

}


// ======================================
// GERAR ID ÚNICO
// ======================================

function gerarID() {

	return crypto.randomUUID();

}


// ======================================
// ENVIAR FEEDBACK
// ======================================

formFeedback.addEventListener("submit", async (event) => {

	event.preventDefault();

	const botao = document.getElementById("btnGerarLink");

	botao.disabled = true;

	botao.textContent = "Salvando feedback...";

	try {

		// IDENTIFICAR ALUNO

		const aluno = document.getElementById("nomeAluno").value;

		const feedback = document.getElementById("feedbackProfessor").value;


		// CAPTURAR HABILIDADES

		// CAPTURAR HABILIDADES

		const nomesHabilidades = [
			"Foco",
			"Lógica",
			"Resiliência"
		];

		const habilidades = nomesHabilidades.map((nome, index) => {

			const numero = index + 1;

			const nota = document.querySelector(
				`input[name="habilidade${numero}"]:checked`
			);

			return {
				nome: nome,
				nota: nota ? Number(nota.value) : 0
			};

		});


		// GERAR ID DO FEEDBACK

		const id = gerarID();


		// ENVIAR IMAGENS PARA O SUPABASE

		let imagensSalvas = [];

		for (const imagem of imagens) {

			const caminho =
				`${id}/${crypto.randomUUID()}-${imagem.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

			const { error: erroUpload } = await db.storage
				.from("feedback-imagens")
				.upload(caminho, imagem);

			if (erroUpload) {
				throw erroUpload;
			}

			const { data } = db.storage
				.from("feedback-imagens")
				.getPublicUrl(caminho);

			imagensSalvas.push({
				nome: imagem.name,
				url: data.publicUrl
			});

		}


		// MONTAR DADOS DO FEEDBACK

		const dados = {

			id: id,

			aluno: aluno,

			habilidades: habilidades,

			feedback_professor: feedback,

			links: links,

			imagens: imagensSalvas

		};


		// SALVAR NO BANCO DE DADOS

		const { error } = await db
			.from("feedbacks")
			.insert(dados);

		if (error) {
			throw error;
		}


		// GERAR LINK EXCLUSIVO

		const link = new URL(
			"formulario.html",
			window.location.href
		);

		link.searchParams.set("id", id);


		// MOSTRAR LINK GERADO

		mostrarLink(link.href);

	} catch (erro) {

		console.error("ERRO AO SALVAR FEEDBACK:", erro);

		alert(
			"Erro ao salvar:\n" +
			(erro.message || JSON.stringify(erro))
		);

		botao.disabled = false;

		botao.textContent = "Gerar link do feedback";
	}

});


// ======================================
// EXIBIR LINK GERADO
// ======================================

function mostrarLink(link) {

	const editor = document.querySelector(".editor");

	editor.innerHTML = "";

	const titulo = document.createElement("h1");

	titulo.textContent = "Feedback criado!";

	const mensagem = document.createElement("p");

	mensagem.textContent =
		"Seu feedback foi salvo. Compartilhe o link com os responsáveis:";

	const campo = document.createElement("input");

	campo.type = "text";

	campo.value = link;

	campo.readOnly = true;

	const copiar = document.createElement("button");

	copiar.type = "button";

	copiar.textContent = "Copiar link";

	copiar.addEventListener("click", async () => {

		try {

			await navigator.clipboard.writeText(link);

			copiar.textContent = "Link copiado!";

		} catch {

			campo.select();

			alert("Selecione e copie o link manualmente.");

		}

	});

	editor.appendChild(titulo);

	editor.appendChild(mensagem);

	editor.appendChild(campo);

	editor.appendChild(copiar);

}


// ======================================
// VISUALIZAR FEEDBACK PELO LINK
// ======================================

async function carregarFeedback() {

	const parametros = new URLSearchParams(
		window.location.search
	);

	const id = parametros.get("id");

	if (!id) return;

	const editor = document.querySelector(".editor");

	// Esconder o formulário de criação
	formFeedback.hidden = true;

	// Esconder o botão voltar para a página inicial
	const linkVoltar = editor.querySelector(":scope > a");

	if (linkVoltar) {
		linkVoltar.style.display = "none";
	}

	editor.querySelector("h1").textContent =
		"Carregando feedback...";

	try {

		const { data, error } = await db.rpc(
			"get_feedback",
			{ p_id: id }
		);

		if (error) throw error;

		if (!data) {
			throw new Error("Feedback não encontrado.");
		}


		// CRIAR CABEÇALHO DO FEEDBACK

		const cabecalho = document.createElement("div");

		cabecalho.className = "cabecalho-feedback";

		// CRIAR TÍTULO

		const titulo = document.createElement("h1");

		titulo.textContent = "FEEDBACK DO ALUNO";

		// CRIAR ANIMAÇÃO

		const animacao = document.createElement("video");

		animacao.src = "./midia/Feedback.mp4";

		animacao.autoplay = true;
		animacao.loop = true;
		animacao.muted = true;
		animacao.playsInline = true;

		// ADICIONAR ELEMENTOS AO CABEÇALHO

		cabecalho.appendChild(titulo);
		cabecalho.appendChild(animacao);

		// SUBSTITUIR TÍTULO ORIGINAL

		editor.querySelector("h1").replaceWith(cabecalho);



		const visualizacao = document.createElement("div");

		visualizacao.className = "visualizacao-feedback";

		// NOME DO ALUNO

		const nome = document.createElement("h2");

		nome.textContent = data.aluno;

		visualizacao.appendChild(nome);


		// HABILIDADES

		const tituloHabilidades = document.createElement("h3");

		tituloHabilidades.textContent = "Habilidades";

		visualizacao.appendChild(tituloHabilidades);

		data.habilidades.forEach((habilidade) => {

			const item = document.createElement("p");

			item.textContent =
				`${habilidade.nome}: ${"★".repeat(habilidade.nota)}${"☆".repeat(5 - habilidade.nota)} (${habilidade.nota}/5)`;

			visualizacao.appendChild(item);

		});


		// FEEDBACK DO PROFESSOR

		const tituloFeedback = document.createElement("h3");

		tituloFeedback.textContent = "Feedback do professor";

		const textoFeedback = document.createElement("p");

		textoFeedback.textContent = data.feedback_professor || "Nenhum feedback informado.";

		visualizacao.appendChild(tituloFeedback);

		visualizacao.appendChild(textoFeedback);


		// LINKS DOS PROJETOS

		const tituloLinks = document.createElement("h3");

		tituloLinks.textContent = "Links dos projetos";

		visualizacao.appendChild(tituloLinks);

		data.links.forEach((link) => {

			const a = document.createElement("a");

			a.href = link;

			a.target = "_blank";

			a.rel = "noopener noreferrer";

			a.textContent = link;

			visualizacao.appendChild(a);

		});


		// IMAGENS DOS PROJETOS

		const tituloImagens = document.createElement("h3");

		tituloImagens.textContent = "Imagens dos projetos";

		visualizacao.appendChild(tituloImagens);

		data.imagens.forEach((imagem) => {

			const img = document.createElement("img");

			img.src = imagem.url;

			img.alt = imagem.nome;

			img.className = "imagem-feedback";

			visualizacao.appendChild(img);

		});


		editor.appendChild(visualizacao);
		// Comemorar a abertura do relatório
		soltarConfetes();

	} catch (erro) {

		console.error(erro);

		editor.querySelector("h1").textContent =
			"Feedback não encontrado";

		const mensagem = document.createElement("p");

		mensagem.textContent =
			"Não foi possível localizar este feedback. Verifique o link.";

		editor.appendChild(mensagem);

	}

}

// ======================================
// ANIMAÇÃO DE CONFETES
// ======================================

function soltarConfetes() {

	const duracao = 3000;

	const fim = Date.now() + duracao;

	const cores = [
		"#ff595e",
		"#ffca3a",
		"#8ac926",
		"#1982c4",
		"#6a4c93",
		"#ff70a6"
	];

	(function animar() {

		confetti({
			particleCount: 5,
			angle: 60,
			spread: 65,
			origin: { x: 0 },
			colors: cores
		});

		confetti({
			particleCount: 5,
			angle: 120,
			spread: 65,
			origin: { x: 1 },
			colors: cores
		});

		if (Date.now() < fim) {
			requestAnimationFrame(animar);
		}

	})();

}


// EXECUTAR VERIFICAÇÃO AO ABRIR A PÁGINA

carregarFeedback();
