CREATE TABLE usuarios (
	id SERIAL primary key, 
	nome VARCHAR(255),
	email VARCHAR(255) UNIQUE,
	senha VARCHAR(255)
	);
	
	CREATE TABLE financeiros(
	id SERIAL primary key,
	descricao VARCHAR(255),
	valor REAL,
	tipo VARCHAR(50),
	usuarioId INTEGER,
	CONSTRAINT fk_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
)
