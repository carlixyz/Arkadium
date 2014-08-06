#pragma once

#include "zakengine/zak.h"
using namespace zak;

class Brick : public Shape {

public:
	Brick();
	~Brick();

	bool Initialize();
	void OnCollide(Entity2D *entity);

private:
};